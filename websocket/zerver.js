const express = require('express')
const app = express();
//websocket을 위한 라이브러리 설치
// install socket.io
const socket =require('socket.io');
const http =require('http') //socket과 연결하여 http문서를 읽기위해서 설치
const server = http.createServer(app);
const io = socket(server);
const nunjucks =require('nunjucks');

app.use(express.static('./node_modules/socket.io/client-dist'))
app.set('view engine','html')
nunjucks.configure('views',{express:app,})

app.get('/',(req,res)=>{
    res.render('index')
});

//addeventlisner('',callback)
io.sockets.on('connection',(socket)=>{
    socket.on('send',(data)=>{
        console.log(`클라이언트에서 받은 메세지는 ${data.msg}`);
        socket.broadcast.emit('call',data.msg)
    })
})


server.listen(3000,()=>{
    console.log('server 3000');
})
