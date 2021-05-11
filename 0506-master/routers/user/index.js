const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const multer = require('multer');
const Path = require('path');

/*그냥 통암기*/
const upload = multer({ //multer안 1객체 2인자값
    storage:multer.diskStorage({
        destination:function(req, file, callback){ //어디에 저장할 것인지
            callback(null,'uploads/') //폴더명
        },
        filename:function(req,file,callback){ //어떤 이름으로 저장할 것인지
            callback(null, new Date().valueOf() + Path.extname(file.originalname))
        }
    }),
})




//해당폴더의 하위 URL을 관리하는 파일.
// join login info


//localhost:3000/대분류/중분류
//localhost:3000/user/[중분류]
//npm install multer
router.get('/join',controller.join) // http://localhost:3000/user/join  //join에 도착하면 폼만 전달해주는 값
router.get('/login',controller.login)
router.get('/logout',controller.logout);
router.get('/info',controller.info)
router.post('/join_sucess',upload.single('img'),controller.join_success); //img값만 분리
router.post('/login_check',controller.login_check);
router.get('/userid_check',controller.userid_check);


module.exports = router;