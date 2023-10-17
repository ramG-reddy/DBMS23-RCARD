const express = require('express');
const cors= require('cors');
  const mysql= require('mysql');
const moment = require('moment');
const router=express.Router();

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
<<<<<<< HEAD
    password:"Password",
    database:"project",
    multipleStatements:true
})
// get all members updated with db
=======
    password:"",
    database:"trial2",
    multipleStatements:true
})
// get all members
router.get('/',(err,res)=>{
    // if(err) return res.json(err);
    return res.json("FROM SERVER");
});
>>>>>>> 99cea9eea9398dd1892ee8706dcd64536bfec047
router.get('/todos',(err,res)=>{
    const sql="SELECT * FROM todo";
    db.query(sql,(err,data)=>{
     if(err) return res.json(err);
     return res.json((data));
    })
    
 });
 //create a todo updated with db
 router.post('/create',(req,res)=>{
    const sql="INSERT INTO todo (t_title,u_name,project,tags,t_id) VALUES (?,?,?,?,NULL) ";
    const val=[req.body.Title,req.body.uname,req.body.project,req.body.Tags];
    console.log(val);
    db.query(sql,val,(err,data)=>{
        if(err)  return res.json(err);
        
        return res.json({mess:"INSERTED VALUES ..."});
    })
})
//delete member using id updated with db
router.delete('/:id',(req,res)=>{
<<<<<<< HEAD
    const sql="DELETE FROM todo WHERE t_id=?";
    const v=req.params.id;
    console.log(v);
    db.query(sql,v,(err,data)=>{
     if(err) return res.json(err);
     
     return res.json({mess:"Deleted VALUES ..."});
 })}
 )
 // seraching on tags
router.get('/tags',(req,res)=>{
    let tags=req.body.tags;
    tags = '%'+tags+'%';
    const sql="SELECT * FROM todo WHERE tags LIKE ?";
    db.query(sql,tags,(err,data)=>{
        if(err) return res.json(err)
        return res.json((data))
=======
   const sql="DELETE FROM todo WHERE T_id=?";
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

>>>>>>> 99cea9eea9398dd1892ee8706dcd64536bfec047
    })
}) 


//updating todo member using id
router.put('/update/:id',(req,res)=>{
    const sql="UPDATE todo SET t_titile=? WHERE t_id=?";
    const val=[req.body.Title];
    console.log(val);
    db.query(sql,[...val,req.params.id],(err,data)=>{
        if(err) return res.json("ERROR");
        return res.json({mess:`UPDATED ${req.params.id}`}) 

    })
})


//login and updated with new db
router.post('/login',(req,res)=>{
<<<<<<< HEAD
    const sql="SELECT u_name FROM login WHERE u_name=? && pswd=?";
=======
    const sql="SELECT u_name FROM login WHERE u_name=? && Pswd=?";
>>>>>>> 99cea9eea9398dd1892ee8706dcd64536bfec047
    const val=[req.body.Username,req.body.Password];
    db.query(sql,val,(err,data)=>{
        if(err) return res.json("LOGIN FAILED");
        if(data.length >= 0) return res.json(data);
        
        
    })
})
module.exports = router;



