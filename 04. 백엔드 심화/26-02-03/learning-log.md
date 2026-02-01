### TCP/IP란?


### DB 조회
// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Youtube',
  dateStrings: true, // 타임존 설정은 db에서 String 전환은 이 옵션으로
});

// A simple SELECT query
connection.query(
  'SELECT * FROM `users`',
  function (err, results, fields) {
    // 비구조화
    var {id, email, name, created_at} = results[0];
    
    console.log(id, email, name, created_at);
  }
);
