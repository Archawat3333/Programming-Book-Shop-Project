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
    let sql = '';
    sql += ' SELECT tb_order_detail.*, tb_product.barcode, tb_product.name, tb_product.img FROM tb_order_detail';
    sql += ' LEFT JOIN tb_product ON tb_product.id = tb_order_detail.product_id'
    sql += ' WHERE tb_order_detail.order_id = ?';
    sql +=  ' ORDER BY tb_order_detail.id DESC';
    
    let params = [req.params.id];
    let totalQty = 0;
    let totalPrice =0;
    conn.query(sql, params ,(err, result) => {
      if (err) throw err;
  
      for (let i = 0; i < result.length; i++) {
        let orderInfo = result[i];
        totalQty += orderInfo.qty;
        totalPrice += (orderInfo.qty * orderInfo.price);
      }
  
      let sql_test = 'SELECT * FROM tb_imformation';
          conn.query(sql_test ,(err,information) => {
  
      res.render('Order/orderInfo',
       {orderDetails: result,totalQty:totalQty,totalPrice:totalPrice ,informations:information[0]});
          });
    })
  });
  



module.exports = router;