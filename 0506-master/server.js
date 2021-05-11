const express = require('express');
const {sequelize} = require('./models'); // 객체
const {User} =require('./models');
const app = express();
const router = require('./routers/index');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})

app.use(cors());

app.use(session({
    secret:'aaa',
    resave:false,
    saveUninitialized:true,
}))

app.use(bodyParser.urlencoded({extended:false}));

// seqeulize.sync -> new Promise 객체로 반환이됩니다.
sequelize.sync({ force:false, })   //수정할때 사용 force:ture
.then(()=>{
    console.log('접속 성공')
})
.catch(()=>{
    console.log('접속 실패');
})


app.use('/',router); // 미들웨어는 2개가능  비동기

app.listen(3000,()=>{
    console.log('server start port 3000');
});