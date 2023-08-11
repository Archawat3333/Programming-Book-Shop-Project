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

  
  router.get('/', isLogin, (req, res) => {
    let sql = 'SELECT tb_order.img,tb_order.id,user_add.name,user_add.homeid,user_add.muid , user_add.tambon, user_add.district, user_add.province,user_add.zip,user_add.phone,user_add.email,tb_order.pay_date,tb_order.send_date,tb_order.track_name,tb_order.track_code FROM tb_detail_order LEFT JOIN user_add ON tb_detail_order.user_add_id = user_add.id  LEFT JOIN tb_order ON tb_detail_order.order_id = tb_order.id ORDER BY id DESC';
    conn.query(sql , (err, result) => {
      if (err) throw err;
      sql_test = 'SELECT * FROM tb_imformation';
          conn.query(sql_test ,(err,information) => {
            if (result.length == undefined) {
              res.render('Order/order', {orders: {},informations:information[0]});
            }
            else {
              res.render('Order/order', {orders: result,informations:information[0]});
            }
          })
      
     
    })
  });


module.exports = router;