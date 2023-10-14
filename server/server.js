const express = require('express');
const cors= require('cors');
const app= express();   
const mysql= require('mysql');
const moment = require('moment');
const PORT=process.env.PORT || 3002;
app.use(express.json());
app.use(cors());

app.use('/todos',require('./routes/todos.js'));


app.listen(PORT,()=>{console.log(`listening on port ${PORT}`);});

