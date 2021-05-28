const express =require('express');
const cookieParser =require('cookie-parser');
const token = require('./createtoken'); //외부 js파일 가져오기
const ctoken = require('./jwt');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'));
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})

app.use(cookieParser());
app.get('/',(req,res)=>{
    //key:value
  //응답 메세지에서 header부분에 쿠키를 생성해서 주겠다.
                                //res.cookie('키','벨류')->
                                //hdeaders영역에 set-cookie:token=ingoo;
    /*
        headers:{
            set-cookie:'token=ingoo'
        }
    */

    let {msg} = req.query;

    res.render('index');
    /*
    res.send나 res.render 결국 응답메세지를 완성시켜서 보내준다
    */
})

app.get('/menu1',(req,res)=>{
    console.log(req.cookies);
    res.send('menu1페이지입니다');
})

//poset auth/local/login
app.post('/auth/local/login',(req,res)=>{
    let {userid,userpw} =req.body;
    // let {userid,userpw} =JSON.parse(req.get('data'))//요청쪽 get은 해당속성값에 접근가능하게함
    // console.log('body req : ',userid,userpw);
    // console.log('data req :',userid,userpw);
    //통신규격은 body라고 한다
    let result = {};
    if(userid=='root' && userpw =='root'){
        //로그인성공
        result = {
            result:true,
            msg:'로그인에 성공했다'
        }
        //token 내용을 생성하는 위치 
        //따로생성 메서드만 생성
        let token =ctoken(userid);
        res.cookie('Accesstoken',token,{httpOnly:true,secure:true,})
    }else{
         //로그인 실패
        result={
            result:false,
            msg:'아이디와 패스워드를 확인하라'
        }
    }
    res.json(result)
})
app.get('/user/info',auth,(req,res)=>{
    res.send(`Hello ${req.userid}`);
})
app.get('/login',(req,res)=>{
    let {id,pw} = req.query; //비구조 할당문 사용시 let,const 변수선언문이 꼭필요하다
                             //혹시 사용할 이유가 없다면 ()를 써라
    if(id=='root'&& pw=='root'){
            //토큰생성
            let ctoken = token();
            res.cookie('token',ctoken,{httpOnly:true,secure:true,});
            res.redirect('/?msg=로그인 성공');
    }else{
            //토큰 실패
            res.redirect('/?msg=로그인 실패')
    }
})                        

app.listen(3000,()=>{
    console.log('server tart port 3000!');
});


