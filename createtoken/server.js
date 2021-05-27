const express =require('express');
const cookieParser =require('cookie-parser');
const token = require('./createtoken'); //외부 js파일 가져오기
const app = express();

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

    res.send(`${msg}hello world!<a href="/menu1">menu1</a><a href="/login?id=root&pw=root">로그인`);
    /*
    res.send나 res.render 결국 응답메세지를 완성시켜서 보내준다
    */
})

app.get('/menu1',(req,res)=>{
    console.log(req.cookies);
    res.send('menu1페이지입니다');
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