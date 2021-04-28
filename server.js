const express=require('express');
const app=express();
const main=require("./routes/index");
const board=require("./routes/board");
const nunjucks = require('nunjucks');
const bodyParser=require('body-parser');

nunjucks.configure('view',{
    express:app,
})

app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'html');
app.use(express.static('public'));

app.use('/', main);
app.use('/board',board);


app.listen(3000,()=>{
    console.log('server start port is 3000');
})