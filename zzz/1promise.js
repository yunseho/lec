/*

const 아반떼 = () =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('아반떼 go');
        },3000);
    })
}

const 소나타 = () =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('소나타 go');
        },2000);
    })
}

const 그랜저 = () =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('그랜저 go');
        },1000);
    })
}
*/

/*
//Promise Objec
console.time('x')
아반떼().then( (아무값)=>{   //중간에 오류나면 끊김
    console.log(아무값);
    return 소나타();
}).then((아무값)=>{
    console.log(아무값);
    return 그랜저();
}).then (( 아무값)=>{
    console.log(아무값);
}).catch ((error)=>{
    console.log(error);
}).finally(()=>{
    console.log('end'); 
    console.timeEnd('x');
})
  */
/*
// Array                                  Array[resolve,resovle,resolve]
console.time('x');
Promise.all([아반떼(),소나타(),그랜저()]).then( (result)=>{
    console.log(result);
    console.timeEnd('x');
})
//동시에 할 경우 배열에 담고 하면좋다
*/
let req =1
try{ //코드실행영역
    if(req == undefined)
        throw undefined;

    console.log('hello world');
}catch(e){ //try의 코드가 에러를 발생시키면 아래가 발생
    console.log('req value : ',e);
}

function f(){ // f()입력시 true나옴
    try{
        console.log(0);
        throw "error";
    } catch (e) {
        console.log(1);
        return true;
    }finally{
        console.log(2);
        return false; //가장 마지막 값이 덮어쓰기되서 그래서 출력됨 ture은 안나옴
    }
}


/*
try랑 비슷한 기능
Connection.query("select - from board",(error,result)=>{
    if(error) throw console.log(error); //오류발생시 error 출력하라
})
*/

/*
function sum(a,b){
    return a+b;
}

let a = sum(1,2); //sum 결과값은 어떻게 될까요?

console.log(a);
*/