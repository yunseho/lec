create database board;
use board;

create table board( 
    idx int(11) not null auto_increment primary key,
    subject varchar(100) not null,
    board_name varchar(50) not null,
    content text,
    today datetime default current_timestamp,
    hit int(11)
)default charset=utf8mb4;

create table userTB( 
    userId varchar(100) not null unique,
    userPW varchar(255) not null,
    userName varchar(30) not null,
    userImage varchar(255) not null
)default charset=utf8mb4;

create table commentTB( 
    idx int(11) not null auto_increment primary key,
    userId varchar(50) not null,
    content text,
    today datetime default current_timestamp
)default charset=utf8mb4;

-- board 와 userTB의 교집합을 join이라고 함

SELECT A.userId,
       B.userName,
       A.subject,
       A.content
       A.today,
       A.hit
From boardth as A
JOIN usertb as B
  ON A.userID = B.userId

/*FEFT JOIN*/

SELECT *
  FROM commenttb as A
  JOIN usertb as B
  ON a.userid =b.userid;


  SELECT * FROM commenttb(기준점) as A
  join userTB as B
on A userId = B userID   


SELECT * FROM boardTB(기준점) as A
join (가져오기) userTB as B
(조건걸기)ON A userId = b.userid (같은것들을 가져와라)

로그인

필드 -> 객체로 바꿈
객체안에 있는 것들을 뽑아내는것이 핵심
맵핑 =객체 처럼 똑같이 사용함

관계 정의하기 
데이터 베이스 스키마

게시판 안에 댓글
번 테이블 idx값 1 안에 여러 댓글들어감

1:N이라함
아이디 페스워드 네임만   받고 나머지 것들은 분리함
이것들은 자주쓰인다
tag


1:1
1:M


화면정의



create table board( 
    idx int(11) not null auto_increment primary key,
    subject varchar(100) not null,
    board_name varchar(50) not null,
    content text,
    today datetime default current_timestamp,
    hit int(11)
)default charset=utf8mb4;

create table userTB( 
    userId varchar(100) not null unique,
    userPW varchar(255) not null,
    userName varchar(30) not null,
    userImage varchar(255) not null
)default charset=utf8mb4;

create table commentTB( 
    idx int(11) not null auto_increment primary key,
    userId varchar(50) not null,
    content text,
    today datetime default current_timestamp
)default charset=utf8mb4;


insert into commentTB(idx , userId,content,today) values('1','곽인구''web7722',0415);
insert into commentTB(idx , userId,content,today) values('2','호레이','쀼잉쀼2',0413
insert into commentTB(idx , userId,content,today) values('3','가레이','후르르끼2','0419');
 insert into commentTB(idx , userId,content,today) values('4','조레이','김김갈걸',0413);

insert into userTB(userId ,userPW,userName,userImage) values('asd4rt','1234','조곽인구','web7722');
insert into userTB(userId ,userPW,userName,userImage) values('ansdgjk','1234','김곽인구','web7722');
insert into userTB(userId ,userPW,userName,userImage) values('qjieow','1234','탁곽인구','web7722');
insert into userTB(userId ,userPW,userName,userImage) values('asmlkkfd','1234','호곽인구','web7722');



insert into board(subject,board_name,content,today,hit) values('01234','조곽인구','aweb7722',0101,0);
insert into board(subject,board_name,content,today,hit) values('91234','김곽인구','bweb7722',0102,0);
insert into board(subject,board_name,content,today,hit) values('81234','탁곽인구','cweb7722',0103,0);
insert into board(subject,board_name,content,today,hit) values('71234','호곽인구','dweb7722',0104,0);


SELECT * FROM commentTB as A
  JOIN userTB as B
  ON a.userid =b.userid;


update user[테이블명] set username='홍길동2[변경할이름]' where username='홍길동[변경대상]'; 
update userTB set userId='곽인구'where userId='ansdgjk'; 
update userTB set userId='호레이 'where userId='asd4rt'; 
update userTB set userId='가레이 'where userId='asmlkkfd'; 