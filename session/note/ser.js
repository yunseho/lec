console.log('switch문 이해하기');

//성별

let gender = "남자"; //남자 or 여자

// 남자일경우 숫자 1 출력 여자일경우 숫자2 출력

if(gender=='남자'){
    console.log(1);
}else if (gender =='여자'){
    console.log(2);
}

//if문에서 ==만 활용할때 ==을사용해서 값을 여러개표현할때 좋음 //가독성차이
switch(gender){
    case'남자':
        console.log(1);
    break;
    case'여자':
        console.log(2);
    break;
    case'남자1': //추가하기도 편함
        console.log(1);
    break
}

/*
if문의 변수명이 모두 같을 때에만 switch문으로 변경할 수 있다
가독성이 좋다는 큰장점이 있음
*/
let 과일 = "배";

switch(과일){
    case'사과':
        console.log('빨강');
    break;
    case'참외':
    case'바나나':
        console.log('노랑');
    break;
    case'수박':
    case'키위':
        console.log('초록');
    break;
    case'포도':
        console.log('보라');
    break;
    default:
        console.log('입력되지않는 과일');
}