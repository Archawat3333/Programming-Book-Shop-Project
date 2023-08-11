let express = require('express');
let router = express.Router();
let conn = require('./connect');
let jwt = require('jsonwebtoken');
let secertCode = 'myecom2022key';
let session = require('express-session');
let formidable = require('formidable');
let fs = require('fs');
let numeral = require('numeral');
let dayjs = require('dayjs');
let dayFormat = 'DD/MM/YYYY';

//เวลากดเพิ่ม มันจะไปที่หน้า addUser
router.get('/',isLogin ,(req, res) => {
    sql_test = 'SELECT * FROM tb_imformation';
    if (req.session.level == 'admin') {
    conn.query(sql_test ,(err,information) => {
      res.render('User/addUser', {user: {},informations:information[0],text:'เพิ่ม'});
    })
  }
    else {
      res.redirect('/');
    }
  });
  //เอาไว้เพิ่ม มันจะ post ค่ามา
  router.post('/',isLogin ,(req, res) => {
    let sql = 'INSERT INTO tb_user SET ?';
    let params = req.body;
    conn.query(sql, params, (err, result) => {
      if (err) throw err;
      res.redirect('/user');
    })
  });

  //Function Login
function isLogin(req, res, next) { //MiddleWare
  if (req.session.token != undefined) {
    next();
  }
  else {
    res.redirect('/login');
  }
};

module.exports = router;