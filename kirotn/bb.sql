create database homepage;
use homepage;
create table board( 
idx int(11) not null auto_increment primary key,
subject varchar(100) not null,
board_name varchar(50) not null,
content text,
today datetime default current_timestamp,
-- default 값이 없으면 알아서 넣어라
hit int(11)
) auto_increment=1 default charset=utf8mb4;

-- INSERT INTO homepage(idx, subject, board_name, content,today,hit)
-- values(1, 20050515132848, 'test', 'I am testing now.');