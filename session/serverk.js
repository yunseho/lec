const express =require('express');
const nunjucks = require('nunjucks');
const axios = require('axios')
const qs = require('qs')
// const session = require('express-session');

// const passport = require('passport')
// const cookieParser = require('cookie-parser')
// const passportConfig = require('passport')
const app = express();
const session = require('express-session');

app.use(session({
    secret:'sjkldsf',
    resave:false,
    secure:false,
    saveUninitialized:false,
}))

app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})

const kakao = {
    clientID:'556da33aae36331513be2b2add401e33',
    clienTSecret:'KyaaXiCaiDa0Po88TNv4afrxXGgV8xdR',
    redirectUri :'http://localhost:3000/auth/kakao/callback'
}
/*
profile,account_email
account_email
*/
app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/auth/kakao',(req,res)=>{
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile,account_email`
    res.redirect(kakaoAuthURL);
})

app.get('/auth/kakao/callback', async (req, res) => {
    //axios의 return 값은 Promise Object
    const {session, query} =req; //req.session->session
                                //req.query - > query
    const [code] = query ;//req.query.code -> code
 
    let token;
    try {
        token = await axios({
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }, // npm install qs
            data: qs.stringify({
                grant_type: 'authorization_code', // 특정 스트링 
                client_id: kakao.clientID,
                client_secret: kakao.clientSecret,
                redirectUri: kakao.redirectUri,
                //code: req.query.code, //속성값과 변수값이 같기 때문에 하나로 처리
                code,
            }) // 객체를 String으로 변환.

        })
    } catch (err) {
        res.json(err.data)
    }

    console.log(token);

    let user;
    try {
        user = await axios({
            method: 'GET',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization: `Bearer ${token.data.access_token}`
            }
        })
    } catch (err) {
        res.json(err.data)
    }

    console.log(user);

    req.session.kakao =user.data; 
    /*아래와 같은 구분이다
    req.session = {
        ['kakao'] : user.data,
    }*/
    const authDate = {
        ...token.data, // 깊은복사
        ...user.data,  // 깊은복사
    }
    
    
    session.authDate = {
        ["kakao"] :authDate,
    }
    
    console.log(session);



    res.redirect('/');
});

app.get('/auth/info',(req,res)=>{
    let {nickname,profile_image} = req.session.kakao.properties
    res.render('info',{
        nickname,profile_image
    })
})



app.listen(3000,()=>{
    console.log(`server start port 3000`);
})

