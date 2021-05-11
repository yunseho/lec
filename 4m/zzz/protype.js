/*
function User(name,age){
    this.name =name;
    this.age = age;
   
}

User.prototype.showNanme = function(){
    console.log(this.name);   //this는 user를 뜻함
}


const gildong = new User('길동',20);

class User2 {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    showNanme(){
        console.log(this.name);
    }
}

const dogoo = new User2('dogoo',20);

*/

class Car{ //부모
    constructor(color){
        this.color =color;
        this.whells =4;
    }

    drive(){
        console.log('drive');
    }
    stop(){
        console.log('stop');
    }
}
//자식
class avante extends Car{ //아반떼(자식)는 계승한다 차를(부모)
    name(){
        console.log('아반떼');
    }
}

const 아반떼 = new avante('blue');

//위코드로 prototype __proto__ 활동용하여 똑같이 만들기