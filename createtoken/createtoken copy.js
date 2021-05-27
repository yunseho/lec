const crypto =require('crypto');
/*
HEADER: 이 토큰의 정보를 담고 있다.
{
  "alg": "HS256",
  "typ": "JWT"
}

PAYLOAD:
{
    "sub": "1234567890",
    "name": "yunseho",
    "iat": 1516239022
  }

VERIFY SIGNATURE

  HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    
  your-256-bit-secret
  
  ) secret base64 encoded


   1차목표 header 암호화기
  0,1 - > 2진법 16진법이랑 친구다
  2진법 
  10진법
  16진법

  바이너리 데이터
  */

  let txt = "안녕하세요"
  let header= {
    "alg": "HS256",
    "typ": "JWT"
}
console.log(typeof header); //object 

//object -> string
console.log(typeof JSON.stringify(header)); //string


console.log('OBject:',header);
console.log('String:',JSON.stringify(header));

console.log('OBject:',header.alg); //찍힘
console.log('String:',JSON.stringify(header).alg); //안찍힘


let txt2 = Buffer.from(JSON.stringify(header)).toString('base64').replace('=','');

//  let txt2 = Buffer.from(txt)
  //16진수로 바꿈 또는 바이너리 데이터이로 바꿨다고 할 수 있다
  //16진수로 바꾼 것을 다시 64진수로 바꾸면 더 줄일 수 있다.
  console.log(txt2);

  //image도 텍스트로 이뤄져 있다
  //텍스트가 바이너리 형식이다

  //비트숫자가 같기 때문에 표현하기 쉬워서 bit
  //15라는 숫자를 2진법으로 표현 1111               8+4+2+1
  //15라는 숫자를 16진법으로 표현 F
  //16 0 1 2 3 4 5 6 7 8 9  a  b  c  d e  f 
  //10 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 
 // 2 0000~                               1111

 let PAYLOAD=
 {
     "sub": "1234567890",
     "name": "yunseho",
     "iat": 1516239022
   }

   let encodepayload =Buffer.from(JSON.stringify(PAYLOAD)).toString('base64');
   console.log(encodepayload);
 
   //1.어떤암호화를 할꺼냐 (sha256) //블록체인
   //2.암호화 규칙 스트링으로 적는다.
let SIGNATURE=crypto.createHmac('sha256',Buffer.from('your-256-bit-secret'))
              .update(`${txt2}.${encodepayload}`)//header.payload
              .digest('base64')
              .replace('==','')
console.log(SIGNATURE);
console.log(`${txt2}.${encodepayload}.${SIGNATURE}`);
   
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Inl1bnNlaG8iLCJpYXQiOjE1MTYyMzkwMjJ9.gb8IpMHIk6O4vdGO8sl6Z1bOBzMB99zTwblMAPOMFOk
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Inl1bnNlaG8iLCJpYXQiOjE1MTYyMzkwMjJ9.gb8IpMHIk6O4vdGO8sl6Z1bOBzMB99zTwblMAPOMFOk

//초록색 class
//파란색 상수
//노랑색 함수