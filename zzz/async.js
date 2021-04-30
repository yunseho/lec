/*
콜백헬을 해결하기 위해 Promise가 나왔지만
가독성이 떨어져서 asyne가 탄생했다
*/

// async function 자동차(){

//     setTimeout(()=>{
//         return Promise.resolve("자동차")
//     },3000);
// }

// 자동차().then(result=>{
//     console.log(result);
// })


//1.반환 값이 Promise 객체로 된다
// { state:? ,result: ?}
//무조건 object로 반환되고 
//return 안에 있는 값들은, Promise 객체 안에 있는 result 값 안에 들어갑니다.
// async function 자동차(name){ 
//     return Promise.reject(name) //return값을 받았을 때 강제로 던지기 가능
// }

// 자동차('아반떼').then(result=>{
//     console.log(result);
// }).catch(result=>{
//         console.log(result);
// }).finally(()=>{
//     console.log('end')})

    function 자동차(name){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(name);
            },3000)
        })
    }

//기존에 사용했던 Promise객체 사용법
/*자동차('아반떼').then((result)=>{
    console.log(result);
})
*/

async function 자동차리스트(){
    const CarName = await 자동차('아반떼'); //Promise Object 안에 있는 result 값을
    console.log(CarName);
    const CarName2 = await 자동차('소나타');
    console.log(CarName2);
    const CarName3 = await 자동차('그랜저');
    console.log(CarName3);
    const CarName4 = await 자동차('소그아');
    console.log(CarName4);
}
자동차리스트();


// function 자동차리스트2(){
//     const carName = 자동차('아반떼');
//     console.log(carName)
// }

// 자동차리스트2();