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
  router.get('/:id',isLogin ,(req, res) => {
    let sql = 'SELECT * FROM user_add WHERE id = ?';
    let params = req.params.id;
    
    conn.query(sql, params, (err, result) => {
      if (err) throw err;
      sql_test = 'SELECT * FROM tb_imformation';
          conn.query(sql_test ,(err,information) => {
            res.render('User/userAdd', {result: result[0],informations:information[0]});
          })
    })
    
    
  });
  
  router.post('/:id',isLogin ,(req, res) => {
    let sql = 'UPDATE user_add SET name = ? , homeid = ? , muid = ? , tambon = ? , district = ? , province = ? , zip = ? , phone = ? , email = ? WHERE id = ?';
    let params = [
      req.body['name'],
      req.body['homeid'],
      req.body['muid'],
      req.body['tambon'],
      req.body['district'],
      req.body['province'],
      req.body['zip'],
      req.body['phone'],
      req.body['email'],
      req.params.id
    ]
    conn.query(sql, params, (err, result) => {
      if (err) throw err;
      res.redirect('/confirmOrder');
      })
  });
  



module.exports = router;