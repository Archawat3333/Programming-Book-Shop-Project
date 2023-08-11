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

function isLogin(req, res, next) { //MiddleWare
    if (req.session.token != undefined) {
      next();
    }
    else {
      res.redirect('/login');
    }
  };

  router.get('/', isLogin , (req, res) => {
    let sql = 'SELECT * FROM tb_imformation';
    if (req.session.level == 'admin') {
    conn.query(sql, (err, result) => {
      
    if (err) throw err;
    sql_test = 'SELECT * FROM tb_imformation';
        conn.query(sql_test ,(err,information) => {
          res.render('HighLight/changeHighLight', {product: result[0],informations:information[0]});
        })
  })
} 
  else {
    res.redirect('/');
  }
  })


  router.post('/', isLogin, (req, res) => {

    let sql = 'UPDATE tb_imformation SET p1 = ?,p2 = ?,p3 = ?'
    let params = [
    req.body['p1'],
    req.body['p2'],
    req.body['p3'],
  ];

  conn.query(sql, params, (err, result) => {
    if (err) throw err;
    req.session.message = 'Save Success';
    res.redirect('/');
  })
});



module.exports = router;