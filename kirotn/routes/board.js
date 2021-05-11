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

router.get('/list', (req, res) => {
    connection.query("select idx,subject,board_name,content,hit,date_format(today,'%Y-%m-%d')as today from board",

     (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.render('list.html', {
                list: results,
    

            });
        }
    });

})

router.get('/write', (req, res) => {
    res.render('write.html');
})

router.post('/write', (req, res) => {
    let subject = req.body.board_subject
    let name = req.body.board_name
    let content = req.body.board_content
    let sql = `insert into board(subject,board_name,content,hit) values('${subject}','${name}','${content}',0)`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect(`/board/view?idx=${results.insertId}`,);
        }
    });
});

router.get('/view', (req, res) => { // 조회수 hit 처리 
    hit = parseInt(req.query.hit) + 1;
    connection.query(`update board set hit=${hit} where idx=${req.query.idx}`, (error, results) => {
        if (error) { console.log(error); }
        else { //console.log(results); 
        }
    });
    connection.query(`SELECT * FROM board WHERE idx=${req.query.idx};`, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.render('view.html', {
                list: results,
            });
        }
    });
});

router.get('/modify', (req, res) => {
    connection.query(`SELECT * FROM board WHERE idx=${req.query.idx};`, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.render('./modify.html', {
                list: results,
            });
        }
    });
});


router.post('/modify', (req, res) => {
    let idx2 = req.body.idx;
    let title = req.body.title;
    let name = req.body.name;
    let content = req.body.content;
    console.log(req.body);
    connection.query(`UPDATE board SET subject='${title}', board_name='${name}', content='${content}' where idx=${idx2}`, (error, results) => {

        res.redirect('/board/list',);
    })
});


router.get('/delete', (req, res) => {
    connection.query(`DELETE FROM board WHERE idx = '${req.query.idx}';`, (error, results) => {
        if (error) {
            console.log(error);
        } else { res.redirect('/board/list'); }
    });
});

module.exports=router;