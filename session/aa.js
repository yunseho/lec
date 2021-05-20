/*

session cookie

local server <----> facebook server
session

oAuth 2.0

loca server    
post facebookkey = api key
facebook에게 요청을 보냄

local server ---> facebook server
                    if(facebookkey == api key)
                        로그인시작
                    }else{
                        불가

local server ------------> facebook server
                              check!
facebook id,pw,fbkey
            <---------------facebook server
                id,pw 맞음
                json 타입으로 줌
facebook id만
어떤 로그인 인지만 저장
(facebook로그인인지,
    카카오인지)




api=key  <---------------facebook server
local server(key)----->  facebook
local server(key)<-----  facebook
                   (토큰)

local server(key)
    토큰을 DB에 저장
    Id도 저장
    토큰으로 세션을 생성

    
    passport를 활용해서 
    local로그인 구현
    그후 kakao login 구현
1.설치
    npm install passport
    npm install passport-local
    npm install cooki-parser
2.셋팅
*/
