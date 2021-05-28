const crypto =require('crypto');


function createtoken() {
    let txt = "안녕하세요"
    let header = {
        "alg": "HS256",
        "typ": "JWT"
    }



    let txt2 = Buffer.from(JSON.stringify(header)).toString('base64').replace('=', '');

    let PAYLOAD =
    {
        "sub": "1234567890",
        "name": "yunseho",
        "iat": 1516239022
    }

    let encodepayload = Buffer.from(JSON.stringify(PAYLOAD)).toString('base64');

    let SIGNATURE = crypto.createHmac('sha256', Buffer.from('your-256-bit-secret'))
        .update(`${txt2}.${encodepayload}`)//header.payload
        .digest('base64')
        .replace('==', '')

    return `${txt2}.${encodepayload}.${SIGNATURE}`;
}

let token =createtoken();

module.exports = createtoken;
