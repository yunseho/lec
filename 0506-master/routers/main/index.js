const express = require('express');
const router = express.Router();
const controller = require('./main.controller')

console.log(controller);

//localhost:3000/대분류/중분류
router.use('/',controller.dd); //dd는 main

module.exports = router;