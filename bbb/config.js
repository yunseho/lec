const mysql = require('mysql'); //패키지 mysql을 사용한다
const { connect } = require('./routes');

const config = {     
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'homepage',
    connectionLimit : 10  //풀의 갯수를 말한다 10개가 기본값임
  };
  
 const pool = mysql.createPool(config);

pool.getConnection((err,connection)=>{ //사용하고 싶은 영역이 생길때만 접속하겠다
  if(err) console.log(err);
  connection.query("selcet * from board",(error,results)=>{
    connection.release(); //커낵트풀에서 가져온 것을 반환하는 부분이다
    //반환후에 에러가 안나면
    if(error) throw error;
    //코드를 실행한다
    console.log(results);
    
  })

})
// throw  종료시점을 잡아줌 그냥 끝냄
 pool.getConnection((err,connection)=>{
    if(err) throw err;    

    connection.query("select * from board",(error,results,fields)=>{
      connection.release();
      if(error) throw error;
      //code block 실행 될때.
      console.log(fields);
      console.log(results);
    })
 })


 //3개 같은 것을 의미
 //function getConn(callback){} 
 //const getConn = function(callback) { }   인자값은 콜백을 받음
 //const getConn = (callback) => {}



 function getConn(callback){
    pool.getConnection((err,connection)=>{
      callback(err,connection);
    });
 } 