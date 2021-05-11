








/*
콜백함수



console.log("promise");

console.log('start1');
setTimeout(()=>{
    console.log('start2');
},3000);
console.log('start3');

setTimeout([콜백함수],3000)

function 아반떼(a)


const 아반떼 = (인자값) =>{
    setTimeout(()=>{
        console.log('아반떼 go');

        인자값()
    },3000);
}

*/
/*
function go(){
    console.log('Go Go');
}

const 아반떼 = (callback) =>{
    setTimeout(()=>{
        console.log('아반떼 go');
        callback()
    },3000);
}

const 소나타 = (callback) => {
    setTimeout(()=>{
        console.log('소나타 go');
        callback()
    },1000)
}

const 그랜저 = (callback) => {
    setTimeout(()=>{
        console.log('그랜저 go');
        callback()
    },2000)
}

// 아반떼();
// 소나타();
// 그랜저();

console.log('start');
아반떼(()=>{
    소나타(()=>{
        그랜저(()=>{
            console.log('자동차경주 끝');
        })
    })
})
*/
//promise 객체

/*
    connencetion.query( "select * from board")

    const pr = new Promise( (resolve,reject)=>{ ->결과 값이 Object
        code block
        setTimeout(()=>{
            resoleve('성공!'); //value
            reject('실패')
        },3000);
    } )


    {
        state: penddig (대기)
        result: undegfined
    }

    {
        state:fulfilled (이행)
        result: "성공! "
    }   

    {
        state:rejected (거부)
        result: "실패! "
    }

*/

const pr = new Promise((resolve , reject)=>{
    setTimeout(()=>{
        reject('error!'); // 성공했을 떄와 실패했을 때 값을 따로 만들 수 있다.
        
    },3000)
})

//then(callback)
pr.then( (result)=>{   //state:fulfilled 
    console.log(result); //처음 담은 인자값 실행
}).catch( (error)=>{   // catch는 then에 붙어서 실행가능
                        //실패되면 아래쪽을 실행하라
    console.log(error); 
})


//위와 아래가 같은 방식이다

// const 아반떼 = (callback) =>{
//     setTimeout(()=>{
//         console.log('아반떼 go');
//         callback()
//     },3000);
// }

// 아반떼();