const passport =require('passport')
const local = require('./localStrategy')

module.exports = ()=>{
    passport.serializeUser((user,cb)=>{
        cb(null,user,userid)
    })

    passport.deserializeUser((userid,cb)=>)
    cb(null,user,userid)

    local*();
}