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
  router.get('/',  (req, res) => {
    let sql2 = 'SELECT * FROM tb_order WHERE email = ? AND pay_date IS NOT NULL';
    let sql = 'SELECT DISTINCT user_add.name,user_add.homeid,user_add.muid , user_add.tambon, user_add.district, user_add.province,user_add.zip,user_add.phone,user_add.email,tb_order.id,tb_order.pay_date,tb_order.send_date,tb_order.track_name,tb_order.track_code ,tb_order.pay_remark, tb_order.send_remark FROM user_add LEFT JOIN tb_order ON tb_order.useradd_id = user_add.id WHERE user_add.email = ? AND tb_order.pay_date IS NOT NULL';
    let params = req.session.email;
  
    conn.query(sql, params, (err, result) => {
      if (err) throw err;
      sql_test = 'SELECT * FROM tb_imformation';
    conn.query(sql_test , (err,information) => {
     res.render('Order/trackOrder', {informations:information[0],orders:result});
    })
    })
  
  })
  
  router.post('/',  (req, res) => {
    let sql = 'SELECT * FROM tb_order WHERE phone = ? AND pay_date IS NOT NULL';
    let params = req.body['phone'];
  
    conn.query(sql, params, (err, result) => {
      if (err) throw err;
      sql_test = 'SELECT * FROM tb_imformation';
    conn.query(sql_test , (err,information) => {
     res.render('Order/trackOrder', {informations:information[0],orders:result});
    })
    })
  })
  



module.exports = router;