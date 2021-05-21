/*
    HTML 에서 POST로 아이디와 패스워드를 받았을 때 처리하는 로직
    전략
*/

const LocalStrategy = require('passport-local').Strategy
const passport = reqire('passport');

console.log(localstorage);

module.exports = () => {
                //인자값이 2개 첫번째는 객체, 두번째는 함수
    passport.use(new LocalStrategy({
        //<input type="text" name="useid">
        //<input type="text" name="usepw">
        //첫번째 인자값은 아이디와 패스워드가 post 넘어오는 인자값을 입력
        usernameField:'userid',
        passwordField:'userpw'
    },(uid,upw,cb)=>{ //uid :userid 넣고 upw:userpw 넣음
        //첫번째는 아이디 벨류값 , 두번째는 패스워드 ,세번째는 콜백함수명

        //dbconnection 이뤄지고 조회한다
        //조회수 실패시 cb(null,false)
        //조회수 성공시 cb(null,{객체})

        //cb(null,{객체}) 처리가 완료 되었을때.
        //cb(null,false) 처리가 안되었을 때.
        let user ={
            userid:uid,
            userpw:upw
        }
    }));


}