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

//----------------------------------------------------------------------------------------------------

router.get('/',isLogin ,(req, res) => {
    let sql = 'SELECT * FROM tb_user ORDER BY id DESC';
    conn.query(sql, (err, result) => {
      if (err) throw err;
      sql_test = 'SELECT * FROM tb_imformation';
          conn.query(sql_test ,(err,information) => {
            res.render('User/user', {users: result,informations:information[0]});  
          })
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