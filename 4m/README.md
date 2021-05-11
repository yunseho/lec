# lec
강의 이동용


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

// Array                                  Array[resolve,resovle,resolve]
console.time('x');
Promise.all([아반떼(),소나타(),그랜저()]).then( (result)=>{
    console.log(result);
    console.timeEnd('x');
})
//동시에 할 경우 배열에 담고 하면좋다





function sum(a,b){
    return a+b;
}

let a = sum(1,2); //sum 결과값은 어떻게 될까요?

console.log(a); 3인 나온다

