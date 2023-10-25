const express = require('express');
const cors= require('cors');
const mysql= require('mysql');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser= require('cookie-parser');
const router=express.Router();
let ver_name="";
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Password",
    database:"project",
    multipleStatements:true
})
const verifyuser=(req,res,next) => {
    const token=req.cookies.token;
    if(!token){ return res.json({mess:"token is required"}); }
    else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json(err);

            }
            else{
               
              ver_name = decoded.name;
              next();  
            }
        })
    }
};
router.post('/',verifyuser,(req,res)=>{
    console.log(req.body.ver_name,ver_name)
    if(req.body.ver_name == ver_name){
    return res.json({"status":"token","name":`${req.name}`})
    }
})
//get todos updated
router.post('/todos',(req,res)=>{
    const sql="SELECT * FROM todo WHERE u_name= ?";
    val =[req.body.u_name]
    db.query(sql,val,(err,data)=>{
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

})}
)




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

    const sql="SELECT u_name,pswd FROM login WHERE u_name=?";
    const val=[req.body.Username,req.body.Password];
    console.log(sql);
    db.query(sql,val,(err,data)=>{
        console.log(data);
        if(err) return res.json("LOGIN FAILED");

        if(data.length > 0){
            console.log(data,req.body.Username);
              bcrypt.compare(req.body.Password.toString(),data[0].pswd,(err,response)=>{
                if(err) return res.json(err)
                if(response) {
                    const name=data[0].u_name;
                    const token=jwt.sign({name},"jwt-secret-key",{expiresIn:'1d'})
                    res.cookie('token',token);
                    res.json({mess:"logined"});
            }

             }) 
        }
        else{
            return res.json("not logined");
        }
        
        
        
    })
})
//register
router.post('/register',(req,res)=>{
     const sql="INSERT INTO login (u_name,pswd) VALUES (?,?)";
    
     bcrypt.hash(req.body.pass.toString(),1,(err,hash)=>{
        if(err) return res.json("hashing smthg wrong");
        const val=[req.body.name,hash];
        console.log(hash,val);
        db.query(sql,val,(err,data)=>{
           if(err) return console.log(err);
           return res.json({"status":"t"});
           })
     })
     


});
module.exports = router;



