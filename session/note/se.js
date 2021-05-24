let obj = {a:10,b:20,c:30,d:40};
let { a:a2, ...last2} = obj;

console.log((a2));
console.log(last2);

let {a:name,b:age,c:key,d:weight} = obj

console.log(name);
console.log(age);
console.log(key);
console.log(weight);


let arr2 = [1,2,3];
let copy = arr2;
let copy2 = [...arr2];

arr2[0]= 'ingoo';
console.log(copy);
console.log(copy2);