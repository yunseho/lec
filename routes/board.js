const express=require('express');
const router=express.Router();
const mysql=require('mysql');

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'homepage'
})

connection.connect();

router.get('/list',(req,res)=>{

    connection.query("select *, date_format(today, '%H:%i %d.%m.%Y') as today, date_format(motoday, '%H:%i %d.%m.%Y') as motoday from board order by idx desc", (error,results)=>{
        if(error){ 
            console.log(error);
        }else{
            console.log(results);

            let total_record = results.length;
            results.forEach(ele=>{
                ele.number = total_record;
                total_record--;
            })
            console.log(results);

            res.render('board/list.html',{  
                board_db:results, 
            })
        }
    })
})

router.get('/write',(req,res)=>{
    res.render('board/write.html')
})

router.post('/writedone',(req,res)=>{
    let subject = req.body.subject;
    let writer=req.body.writer;
    let content=req.body.content;
    let sql=`insert into board (subject,writer,content, today, hit) values ('${subject}','${writer}','${content}', now(),0)`

    connection.query(sql,(error,results)=>{
        if(error){
            console.log(error);
        }else {
            res.redirect('/board/list');  
        }
    })
})

router.get('/view',(req,res)=>{
    let idx = req.query.idx;
    console.log(idx);
    
    connection.query(`select * from board where idx='${idx}'`,(error,results)=>{
        if(error){
            console.log(error)
        }else{
            console.log(results)
            res.render('board/view.html',{
                view_db:results[0],
                
            });
        }
    })

    connection.query(`update board set hit=hit+1 where idx='${idx}'`);
    
})

router.get('/modify',(req,res)=>{
    let idx=req.query.idx;

    connection.query(`select * from board where idx=${idx}`,(error,results)=>{
        if(error){
            console.log(error)
        }else{
            console.log(results);
            res.render('board/modify.html',{
                modify_db:results[0],
            });
        }
    })
})

router.post('/modifydone',(req,res)=>{
    let idx = req.body.idx;
    console.log(req.body);
    let subject = req.body.subject;
    let writer = req.body.writer;
    let content = req.body.content;

    let sql = `update board set subject='${subject}', writer='${writer}', content='${content}', motoday=now() where idx='${idx}'`;

    connection.query(sql,(error,results)=> {
        if(error){
            console.log(error);
        }else{
            console.log(results);
            res.redirect('/board/list');
        }
    })
})

router.get('/delete',(req,res)=>{
    
    let idx=req.query.idx;
    let sql=`delete from board where idx='${idx}'`;
    connection.query(sql,(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/board/list');
        }
    })
})

module.exports=router;