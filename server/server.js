const express = require('express');
const cors= require('cors');
const app= express();   
const mysql= require('mysql');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const bcrypt= require('bcrypt');
const PORT=process.env.PORT || 3002;
const corsOptions ={
    origin:['http://localhost:5173'], 
    credentials:true,            //access-control-allow-credentials:true
    
 }
app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser());

app.use('/todos',require('./routes/todos.js'));
app.use('/kanban',require('./routes/kanban.js'));

app.listen(PORT,()=>{console.log(`listening on port ${PORT}`);});

