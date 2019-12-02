

const express = require('express');
const mysql = require('mysql');

const PORT = process.env.PORT || 5000;

const app=express();

//kết nối đến với database
const conn = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database: 'mytestdb'
})

conn.connect((err)=>{
    (err)? console.log(err):console.log('connect success');
})

require('./routes/staffsRouter')(app,conn);
require('./routes/UserLogin')(app,conn);
require('./routes/nhacungcapRouter')(app,conn);

app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
});