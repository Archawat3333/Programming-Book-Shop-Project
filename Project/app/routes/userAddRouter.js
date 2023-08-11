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

  router.post('/', async (req, res) => {
    let conn = require('./connect2');


       //insert order
    let sql = 'INSERT INTO user_add(name, homeid, muid,tambon,district,province,zip, phone, email,idlog) VALUE(?, ?, ?, ?,?,?,?,?,?,?)';
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
      req.session.iduser,
    ];
    let [rows] = await conn.query(sql, params);
    res.redirect('/confirmOrder'); //การ redirect จะวิ่งไป path ล่าง

  
  });

  router.get('/', isLogin , (req, res) => {

    sql_test = 'SELECT * FROM tb_imformation';
          conn.query(sql_test ,(err,information) => {
  
      res.render('User/userAdd',{informations:information[0], result : {}});
  
          });
    
  })

  



module.exports = router;