const express =require('express');
const nunjucks = require('nunjucks');
const axios = require('axios')
const qs = require('qs')
const app = express();
const session = require('express-session');

app.use(session({
    secret:'sjklsf',
    resave:false,
    secure:false,
}))

app.set('view engin','html');
nunjucks.configure('views',{
    express:app,
})

const kakao = {
    clientID:'556da33aae36331513be2b2add401e33',
    clienTSecret:'KyaaXiCaiDa0Po88TNv4afrxXGgV8xdR',
    redirectUri :'http://localhost:3000/auth/kakao/callback'
}

app.get('/',(req,res)=>{
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&cope=profile,account_email`
    res.redirect(kakaoAuthURL);
})

app.get('/auth/kakao/callback',async(req,res)=>{
    try{
        token = await axios({
            method:'POST',
            url:'https://kauth.kakao.com/oauth/token',
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:qs.stringify({
                grant_type: 'authorizeaiton_code',
            })
        })
    }
})