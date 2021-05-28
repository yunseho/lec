const path = require('path')
require('dotenv').config({path: path.join(__dirname, '.env')}) //__dirname 폴더위치를 middleware에서  그상위를 디폴드 값으로 변경해줌

const crypto =require('crypto'); //npm i crypto




//jwp토큰생성 header.payload.signatue
function createToken(userid){ // server 60번째 줄에서 넘겨줌 userid 값을
    let header ={
        "tpy":"JWT",
        "alg":"HS256"
    }
    let exp = new Date().getTime() +((60*60*2) * 1000) //1970년 1월1일부터 표현 1초 1000
                       //현재시간으로부터 2시간을 더한다
    let payload = {
        userid,
        exp//만료시간 설정
        
    }
    const encodingHeader = Buffer.from(JSON.stringify(header))
                                            .toString('base64')
                                            .replace('==','')
                                            .replace('=','')
    const encodingPayload = Buffer.from(JSON.stringify(payload))
                                            .toString('base64')
                                            .replace('==','')
                                            .replace('=','')
                           // (암호와 모듈,암호화할 key값(공개되면안됨중요))
    const signatue =crypto.createHmac('sha256',Buffer.from(process.env.salt))
                          .update(encodingHeader+"."+encodingPayload) //암호화진행
                          .digest('base64')//변환
                          .replace('==','')
                          .replace('=','')
    let jwt = `${encodingHeader}.${encodingPayload}.${signatue}`
    return jwt;
}

let token = createToken('root');
console.log(token);


module.exports = createToken;


/*
function createtoken와 같은 것임

module.exports = (userid) =>{
}
 */