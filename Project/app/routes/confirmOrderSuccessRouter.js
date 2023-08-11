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

  

  router.get('/' ,(req, res) => {
    sql_test = 'SELECT * FROM tb_imformation';
    conn.query(sql_test , (err,information) => {
      res.render('Order/confirmOrderSuccess', {information:information[0]});
    })
  
  })


module.exports = router;