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

  router.get('/:id', isLogin, (req, res) => {
    sql_test = 'SELECT * FROM tb_imformation';
          conn.query(sql_test ,(err,information) => {
            res.render('Order/payOrder', {orderId: req.params.id,informations:information[0]})
  
          })
  });
  
  router.post('/:id', isLogin, (req, res) => {
    let sql = 'UPDATE tb_order SET pay_date = ?, pay_remark = ? WHERE id = ?';
    let params = [
      req.body['pay_date'],
      req.body['pay_remark'],
      req.params.id
    ]
    conn.query(sql, params, (err,) => {
  
      if (err) throw err;
  
      res.redirect('/order');
          })
        });



module.exports = router;