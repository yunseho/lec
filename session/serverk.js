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
const bodyParser =require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
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
    const {msg} = req.query;
    res.render('index',{
        msg,
        logininfo:req.session.authDate,
    });
});

app.get('/login',(req,res)=>{
    res.render('login');
})


app.post('/login2',(req,res)=>{
    //HTTP/1.1 응답코드(200) 응답내용(ok)
    //응답코드 404 not found
    console.log(req.headers);
    /*
    /res.setHeader('Content_type','application/x-www-form-urlencoded')
    res.send('ok');
    */
   console.log(req.get('user-agent'));
   res.set('token','ingoo')
   res.set('Authorization','bearer enopienbiensidfl')
   console.log(req.body);
    res.json({
        test:'ok'
    })
})


app.post('/login',(req,res)=>{
    const {session,body} =req;
    const {userid,userpw}=body;

    //userid 와 userpw 값을 가지고 DB조회
    //userid root userpw root 일때 성공하는 시나리오작성
    if(userid =='root' && userpw =='root'){
        //로그인성공
        const data ={
            userid,
        }
        session.authDate = {
            ["local"]:data,
        }
        res.redirect('/?msg=로그인완료되었다')
    }else{
        //로그인실패
        res.redirect('/?msg=아이디와패스워드를 확인해주세요')
    }
})

app.get('/auth/kakao',(req,res)=>{
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile,account_email`
    res.redirect(kakaoAuthURL);
})

app.get('/auth/kakao/callback', async (req, res) => {
    //axios의 return 값은 Promise Object
    const {session, query} =req; //req.session->session
                                //req.query - > query
    const {code} = query ;//req.query.code -> code
 
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


    let user;
    try {
        user = await axios({
            method: 'GET',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization: `Bearer ${token.data.access_token}`
            } //url로 보내기는 좀 그래서 headers로 보냄
        })
    } catch (err) {
        res.json(err.data)
    }
 
    const authDate = {
        ...token.data, // 깊은복사
        ...user.data,  // 깊은복사
    }
    session.authDate = {
        ["kakao"] :authDate,
    }
    res.redirect('/');
});

const authMiddleware = (req,res,next)=>{
    const {session}= req;
    if(session.authDate == undefined){
        console.log('로그인이 되어있지않음.');
        res.redirect('/?msg=로그인 안되어 있음')
    }else {
        console.log('로그인 되어있음');
        next();
    }
}

app.get('/auth/info',authMiddleware,(req,res)=>{

    const{authDate} = req.session;//req.session.authDate
    const provider = Object.keys(authDate)[0];

    let userinfo = {}
    switch(provider){//스위치 실행 안에있는 값은 변수(값이 나오는)
                        //if과 다른점 (비교연산자)를 넣어야 하지만 스위치문은 조건을 비교가능
        case"kakao":
            //[code block] 
            userinfo = {
                userid:authDate[provider].properties.nickname,
            }
        break;
        case"local":
            userinfo={
                userid:authDate[provider].userid,
            }
        break;
    } 
    res.render('info',{
        userinfo,
    })
})

app.get('/auth/kakao/unlink',authMiddleware, async (req,res)=>{ 
    /*계수로 접근시 아래 세션값 실행 각session 에 담음
    카카오에게 접속종료 하겠다는 것을 요청하는 내용
    */
    const {session} =req;
    const {access_token} = session.authDate.kakao

    let unlink;
    try{
        unlink = await axios({ //결과값이 뜨기전까지 대기하다가 unlink에 담아서 보냄
            method:"POST",
            url:"https://kapi.kakao.com/v1/user/unlink",
            headers:{
                Authorization: ` Bearer ${access_token}`
            }
        })
    } catch (error){
        res.json(error.data);
    }
     //이값이 떨어진 이유는 이미 카카오측에서 코드상 완료가 된것을 의미함 로그아웃& 회원탈퇴완료
    //세션을 지워줘야 한다
    const {id} =unlink.data;

    if(session.authDate["kakao"].id == id){
        delete session.authDate;
    }


    res.redirect(`/?msg=로그아웃되셨습니다.`)
})
/*
    단독으로 처리불가하기때문에
    카카오에게 요청을 보내야 함,카카오는 응답을 줘야함

    요청
*/

app.get('/auth/logout',(req,res)=>{
    const {session} =req;
    const{authDate} = req.session;//req.session.authDate
    const provider = Object.keys(authDate)[0];
    switch(provider){
        case "local":
            //로그아웃을 어떻게
                delete session.authDate;
                res.redirect('/?msg=로그아웃되셨습니다')
        break;
        case "kakao":
            res.redirect('/auth/kakao/unlink')
        break;
    }
})

app.listen(3000,()=>{
    console.log(`server start port 3000`);
})

