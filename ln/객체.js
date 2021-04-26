
//객체내용 확인 및 가져오기 연습필요


 자동차 = {
    아반떼:{
        엔진:'v2'
    },
    소나타:{
        엔진:'v1'
    }
}
console.log(자동차.소나타.엔진);  /*'v1'뽑기*/



 자동차 = [
    {name:'아반떼',engine:'v0',handle:'동그라미'},
    {name:'소나타',engine:'v1',handle:'그라미'},
    {name:'티라노',engine:'v2',handle:'라미'},
]
console.log(자동차[2].engine);// v1뽑기




 자동차= {// 객체 안에 배열 넣기
    아반떼:['v1',{handle:'동그라미'},'바퀴4개'],
    소나타:['v2',{handle:'네모'},'바퀴5개'],
    그랜저:['v3',{handle:'세모'},'바퀴6개'],
}

// 객체{}.그랜저[2].객체
console.log(자동차.그랜저[1].handle);  /* 세모뽑기*/

 자동차= {// 객체 안에 배열 넣기
    아반떼:['v1',{handle:'동그라미'},'바퀴4개'],
    소나타:['v2',{handle:'네모'},'바퀴5개'],
    그랜저:['v3',{handle:'세모'},'바퀴6개'],
    제네시스:function(){
        console.log('aaa');
    }
}

console.log(자동차.제네시스()); /*aaa출력*/

let obj = [
       {
        idx: 1,
        subject: 'rgergergre',
        board_name: 'adad',
        content: 'gdeged',
        hit: 4,
        today: '2021-04-26'
      },
       {
        idx: 2,
        subject: 'efwwfefew',
        board_name: 'fefeef',
        content: 'feefewf',
        hit: 3,
        today: '2021-04-26'
      },
       {
        idx: 3,
        subject: '고기맛',
        board_name: '양념에 절인 음식',
        content: '달다',
        hit: 3,
        today: '2021-04-26'
      }
    ]

console.log(obj[2]);  //3번째뽑기


obj.forEach((bbq,key,bq)=>{
    console.log(bq);
});