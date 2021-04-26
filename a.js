require('dotenv').config();
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = process.env.SERVER_POST || 3000;

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'homepage',
});

connection.connect();


app.use(bodyParser.urlencoded({extended:false})); //post에서 받아오게 할수있게 만든다
                                                    //css,js,image,도영상 파일등
app.use(express.static('public')); //익스 프레스야 나 정적파일들은 (public)안에 있는 내용으로 만들꺼야
//server7.js 부터 설정된 것임
app.set('view engine','html');

nunjucks.configure('views',{
    express:app
});

app.get('/',(req,res)=>{

    connection.query(`select idx, subject, date_format(today,'%Y-%m-%d %T') as today, hit from board limit 20`,(error,results)=>{
            if(error){
                console.log('error');
            }else{
                console.log(results);
                res.render('index.html',{title:results});
            }
    });
    
        
});


app.get('/list',(req,res)=>{
    connection.query("select idx,subject,board_name,content,hit,date_format(today,'%Y-%m-%d')as today from board",(error,results)=>{
       if(error) {
           console.log(error);
       } else{
           console.log(results); 
           res.render('list.html',{
               list:results,
           });
       }
    });
    
})

app.get('/write',(req,res)=>{
    res.render('board_write.html');
})

app.get('/view', (req, res) => { // 조회수 hit 처리 
    hit = parseInt(req.query.hit)+1 ; 
    connection.query(`update board set hit=${hit} where idx=${req.query.idx}`, (error,results)=>{ 
        if (error) { console.log(error); } 
        else { //console.log(results); 
        } }); 
    connection.query(`SELECT * FROM board WHERE idx=${req.query.idx};`, (error, results) => { if (error) { console.log(error); } 
    else { res.render('board_view.html', { list: results, }); } }); });


app.get('/modify',(req,res)=>{
    res.render('board_modify.html');
})

app.post('/modify',(req,res)=>{
    let idx2 = req.query.idx; 
    let title = req.body.board_subject; 
    let name = req.body.board_name; 
    let content = req.body.board_content; 
    console.log(req.body); 
    connection.query(`update board set subject='${title}', board_name='${name}', content='${content}' where idx=${idx2};`, (error,results)=>{

    res.redirect('/list');
    })
});

app.post('/write',(req,res)=>{
    let subject = req.body.board_subject
    let name = req.body.board_name
    let content = req.body.board_content
    let sql = `insert into board(subject,board_name,content,hit) values('${subject}','${name}','${content}',0)`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            res.redirect('/list',);
        }
   });
});
 
app.get('/view', (req, res) => { // 조회수 hit 처리 hit = parseInt(req.query.hit)+1 ;
    hit = parseInt(req.query.hit)+1 });

    app.get('/delete',(req,res)=>{ 
        connection.query(`DELETE FROM board WHERE idx = '${req.query.idx}';`,(error,results)=>{ 
            if(error){ console.log(error); 
            }else{ res.redirect('/list'); } }); });



app.listen(port,()=>{
    console.log(`server start ${port}`);
});

