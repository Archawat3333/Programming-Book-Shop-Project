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
router.get('/:id',isLogin ,(req, res) => {
    let sql = 'SELECT * FROM tb_user WHERE id = ?';
    let params = req.params.id;
    if (req.session.level == 'admin') {
    conn.query(sql, params, (err, result) => {
      if (err) throw err;
      sql_test = 'SELECT * FROM tb_imformation';
    conn.query(sql_test ,(err,information) => {
      res.render('User/addUser', {user: result[0],informations:information[0],text:'แก้ไข'});
    })
    })
  }
    else {
      res.redirect('/');
    }
  });
  
  router.post('/:id',isLogin ,(req, res) => {
    let sql = 'UPDATE tb_user SET name = ?, email = ?, pwd = ?, level = ? WHERE id = ?';
    let params = [
      req.body['name'],
      req.body['email'],
      req.body['pwd'],
      req.body['level'],
      req.params.id
    ]
  
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