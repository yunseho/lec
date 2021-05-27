const express = require('express');
const app =express();
const nunjucks =require('nunjucks');

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
})

app.get('/',(req,res)=>{
    res.render('index2 copy')
})

app.listen(3000,()=>{
    console.log('server start port 3000');
})