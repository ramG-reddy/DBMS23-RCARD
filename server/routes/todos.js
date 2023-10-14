const express = require('express');
const cors= require('cors');
  const mysql= require('mysql');
const moment = require('moment');
const router=express.Router();

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Password",
    database:"TutorialDB",
    multipleStatements:true
})
// get all members
router.get('/todos',(err,res)=>{
    const sql="SELECT * FROM TODO";
    db.query(sql,(err,data)=>{
     if(err) return res.json(err);
     return res.json((data));
    })
    
 });
// seraching on tags
router.get('/tags',(req,res)=>{
    let tags=req.body.tags;
    tags = '%'+tags+'%';
    const sql="SELECT * FROM TODO_TAGS WHERE Tags LIKE ?";
    db.query(sql,tags,(err,data)=>{
        if(err) return res.json(err)
        return res.json((data))
    })
}) 
// creating member
router.post('/create',(req,res)=>{
    const sql="INSERT INTO TODO (Title,T_id,T_status) VALUES (?,?,?); INSERT INTO TAGS  VALUES(?); INSERT INTO TODO_TAGS(T_id,Tags) VALUES (?,?)";
    const val=[req.body.Title,req.body.T_id,1,req.body.Tags,req.body.T_id,req.body.Tags];
    console.log(val);
    db.query(sql,val,(err,data)=>{
        if(err)  return res.json(err);
        
        return res.json({mess:"INSERTED VALUES ..."});
    })
})
//delete member using id
router.delete('/:id',(req,res)=>{
   const sql="DELETE FROM TODO WHERE T_id=?";
   const v=req.params.id;
   
   db.query(sql,v,(err,data)=>{
    if(err) return res.json(err);
    
    return res.json({mess:"Deleted VALUES ..."});
})}
)

//updating todo member using id
router.put('/:id',(req,res)=>{
    const sql="UPDATE TODO SET Title=?  WHERE T_id=?";
    const val=[req.body.Title];
    db.query(sql,[...val,req.params.id],(err,data)=>{
        if(err) return res.json("ERROR");
        return res.json({mess:`UPDATED ${req.params.id}`}) 

    })
})
//adding notes through a todo NOT WORKING DUE DATE TIME FORMAT ISSUE 
router.post('/notes/create/:Tid',(req,res)=>{
    const val=req.body;
    val.last_edited=new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    val.T_id=req.params.Tid;
    console.log(val);
    const sql="INSERT INTO notes VALUES (?)";
    db.query(sql,[val],(err,data)=>{
        if(err) return res.json(err);
        return res.json({mess:`ADDED A NOTE TO Todo with id: ${req.params.id}`}) 

    })

})
//
//updating todo member using id
router.put('/notes/update/:id',(req,res)=>{
    const sql="UPDATE notes SET Title_note=?, decription=?  WHERE T_id=?";
    const val=[req.body.Title,req.body.description];
    console.log(val);
    db.query(sql,[...val,req.params.id],(err,data)=>{
        if(err) return res.json("ERROR");
        return res.json({mess:`UPDATED ${req.params.id}`}) 

    })
})

//login
router.post('/login',(req,res)=>{
    const sql="SELECT Username FROM Login WHERE Username=? && Password=?";
    const val=[req.body.Username,req.body.Password];
    db.query(sql,val,(err,data)=>{
        if(err) return res.json("LOGIN FAILED");
        if(data.length >= 0) return res.json(data);
        
        
    })
})
module.exports = router;



