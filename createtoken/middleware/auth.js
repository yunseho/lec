require('dotenv').config;
const crypto = require('crypto');

module.exports = (req, res, next) => {

    let {Accesstoken} = req.cookies //클라이언트의 cookie.accesstoken에서 받아옴

        // let tokenArr = Accesstoken.split('.')
    // let header = tokenArr[0]
    // let payload = tokenArr[1]
    if(Accesstoken == undefined){
        res.redirect('/?msg=로그인을진행해주세요');
        return 0;
    }

    let [header, payload, sign] = Accesstoken.split('.');
    let signature = getSignature(header, payload);
    console.log(signature);

    if (sign == signature) {   //sign 이미 만들어진 토큰값   / signature 새로만든 토큰값
        console.log('검증된 토큰입니다.');
        //payload
        let { userid, exp } = JSON.parse(Buffer.from(payload, 'base64').toString());
        console.log(userid)
        console.log(exp);//현재시간으로부터 2시간뒤를 저장한 변수이다
        let nexp = new Date().getTime();
        if (nexp > exp) { //기간이 만료 되었을 때 처리영역
            res.clearCookie('Accesstoken');
            res.json({result:false ,msg:'토큰이 만료되었습니다'})
        }
        //모든 검증이 완료됨.
        req.userid = userid;
        next();
        
    } else {
        res.redirect('/?msg=부적절한 토큰만료')
    }
}


function getSignature(header,payload){
    const signature =crypto.createHmac('sha256',Buffer.from(process.env.salt))
                          .update(header+"."+payload)
                          .digest('base64')
                          .replace('==','')
                          .replace('=','')
    return signature;
}
