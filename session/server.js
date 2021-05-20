const express =require('express');
const session = require('express-session');

const passport = require('passport')
const cookieParser = require('cookie-parser')
const passportConfig = require('passport')
const app = express();



app.use((req,res,next)=>{
    req.ingoo = 'ingoo~?'
    next()
});
//미들웨어 사용으로 각 get에 중복되는 값을 줌


//세션이라는 미들웨어를 만들어서 가능.
//req.session 만들어라
app.use(session({
    //app.use 미들웨어에 session값을 설정해서 req.session 사용할 수 있게 했다
    secret:'osidosidodksofi',
})); 

app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    console.log(passport);
    res.send(`hello world ${req.ingoo}`);
});

app.get('/user',(req,res)=>{
    res.send(`hello world ${req.ingoo}`);
});

app.get('/board',(req,res)=>{
    res.send(`hello world ${req.ingoo}`);
});


app.listen(3000,()=>{
    console.log('server start port 3000');
})