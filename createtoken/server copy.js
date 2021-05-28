const express =require('express');
const cookieParser =require('cookie-parser');
const token = require('./createtoken'); //외부 js파일 가져오기
const app = express();

app.use(cookieParser());

app.get('/',(res,req)=>{
    res.send()
})



app.listen(3000,()=>{
    console.log('server tart port 3000!');
});