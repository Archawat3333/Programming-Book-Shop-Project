let mysql = require('mysql');
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_ecommerce',
  });
  
  conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to database !!!');
  })

  module.exports = conn; //เพื่อโยน conn ให้ห้น้าอื่นไปใช้งาน