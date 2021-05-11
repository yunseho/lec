
const {User} = require('../../models/index');

let join = (req,res) => {
    //res.send('join');
    res.render('./user/join.html') //넌작스를 가져오는 것이다
                                    //실제 실행영역은 server.js부터시작~html까지
}

let login = (req,res) => {
    let flag =req.query.flag;
    res.render('./user/login.html',{ flag})
}

let info = async (req,res) => {
    //, 'userdt']
    let userlist = await User.findAll({});
    
    res.render('./user/info.html',{
        userList: userlist,
    })
    
   /*
   res.json({
       userlist, //=userlist,userlist
   })*/
}

let join_success = async (req,res) =>{
    let userid = req.body.userid;
    let userpw = req.body.userpw;
    let username = req.body.username;
    let gender = req.body.gender;
    // let userimage = req.file.path; //req.file ->object
                            //path는 index에서 처리
    let userimage =req.file == undefined ? '' :req.file.path;
    try{
        let rst = await User.create({ //create 모두비동기 반환값은 프로미스 객체 2가지의 타입
        userid,userpw,username,gender,userimage})
    } catch (e){
        console.log(e);
    }   
    res.render('./user/join_sucess.html',{ //넌작스 두번재인자값에 객체 넣어서 전달
        userid, //join.html {{}}에 값넘기기
        username});
}

let login_check = async (req,res)=>{
    let userid = req.body.userid;
    let userpw=  req.body.userpw;

    let result = await User.findOne({
        where:{ userid,userpw }
    })

    if(result == null){
        //로그인 실패
        res.redirect('/user/login?flag=0')
    }else{
    //Login 성공 했을 때
        req.session.uid =userid;  //서버에 저장이된다
        req.session.isLogin = true; //서버에서 공통적으로 쓰는 변수로 저장됨

        req.session.save(()=>{
            res.redirect('/');
         }) 
    }
}

let logout = (req,res)=>{
    delete req.session.isLogin;
    delete req.session.uid;

    req.session.save(()=>{
        res.redirect('/');
    })
}

let userid_check = async (req,res)=>{
        
        let userid = req.query.userid;
        console.log(userid)
        let flag = false;
        let result = await User.findOne({
            where:{ userid }
        })
        //result undefinde 생성가능
        //result -> 객체가 존재하면 생성 불가능
        if(result == undefined){
            //생성가능
            flag = true;
        }else{
            //생성불가능
            flag = false;
        }
    res.json({
        login:flag,
        userid,
    })
}

module.exports = {
    join:join,
    login:login,
    info:info,
    join_success:join_success,
    login_check:login_check,
    logout,
    userid_check
}