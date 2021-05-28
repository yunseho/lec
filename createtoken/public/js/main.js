document.addEventListener('DOMContentLoaded',init);
function init(){
    const loginBtn = document.querySelector('#loginBtn');
    const layerPopup = document.querySelector('.layerPopup');
    const localLogin = document.querySelector('#localLogin');
    loginBtn.addEventListener('click',loginBtnFn);
    layerPopup.addEventListener('click',popupClose);
    localLogin.addEventListener('click',login);
}

function loginBtnFn(){
    const layerPopup = document.querySelector('.layerPopup');
    layerPopup.classList.add('open')
}

function popupClose(event){
    if(event.target == this){
        this.classList.remove('open')
    }
}

async function login(){
    const userid = document.querySelector('#userid');
    const userpw = document.querySelector('#userpw');

    if(userid.value == ""){
        alert('아이디를 입력해주세요.')
        userid.focus();
        return 0;
    }
    if(userpw.value == ""){
        alert('패스워드를 입력해주세요.')
        userpw.focus();
        return 0;
    }

    //POST auth/local/login
    let url = 'http://localhost:3000/auth/local/login'
    /*
    let options = {
        method:"POST",
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
        body:`userid=${userid.value}&userpw=${userpw.value}`,
    }
    */
   let options ={
       method:"POST",
       headers:{
           'content-type':'application/json',
           'data':JSON.stringify({
            userid:userid.value,
            userpw:userpw.value
           }),
       },
       body:JSON.stringify({
           userid:userid.value,
           userpw:userpw.value
       })
   }

    //headers
    //key-value&key2=value2
    //값을 2개보낸다 userid,userpw

    let response = await fetch(url,options);
    let json = await response.json(); //result가 떨어질떄 까지 기다렸다가 떨어지면 result변수에 담는다
    //상태값 받기
    let {result,msg} =json;

    alert(msg);
    if(result){  //로그인 성공
        let layerPopup = document.querySelector('.layerPopup');
        layerPopup.classList.remove('open')
      
    }else{
        //로그인 실패
        userid.value = '';
        userpw.value = '';
        userid.focus();
    }
}

//컨텐츠타입 해더값 바디타입에따라 전송방법을 다르게