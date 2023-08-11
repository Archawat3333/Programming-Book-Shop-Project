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

  
router.get('/:id', isLogin,async (req, res) => {
    let conn = require('./connect2'); //การเชื่อมต่อแบบ async await
    let sql_test = 'SELECT * FROM tb_imformation';
    let sql_test2 = 'SELECT  user_add.name,tb_order.pay_date,user_add.homeid,user_add.muid , user_add.tambon, user_add.district, user_add.province,user_add.zip,user_add.phone,user_add.email FROM user_add LEFT JOIN tb_order ON tb_order.useradd_id = user_add.id WHERE tb_order.id = ?';
    let sql_test3 = 'SELECT * FROM tb_order_detail WHERE order_id = ?';
    let sql_test4 = 'SELECT SUM(tb_order_detail.qty * tb_order_detail.price) as total_sum, tb_product.name, tb_order_detail.qty as qty, tb_order_detail.price as price, tb_order_detail.id FROM tb_product LEFT JOIN tb_order_detail ON tb_product.id = tb_order_detail.product_id WHERE tb_order_detail.order_id = ?;'
    let sql_test5 = 'SELECT tb_product.name ,tb_order_detail.qty as qty,tb_order_detail.price as price,tb_order_detail.id FROM tb_product LEFT JOIN tb_order_detail ON tb_product.id = tb_order_detail.product_id WHERE order_id = ?;'
  
  
  
    let receipt_id = req.params.id;
    let order_detail = req.params.id;
    let order_detail2 = req.params.id;
    let order_detail3 = req.params.id;
  
  
    
  
          let [information, ] = await conn.query(sql_test);
          let [result, ] = await conn.query(sql_test2,receipt_id);
          let [orders, ] = await conn.query(sql_test3,order_detail);
          let [total_price, ] = await conn.query(sql_test4,order_detail2);
          let [test5, ] = await conn.query(sql_test5,order_detail3);
          console.log(total_price[0].total_sum);
  
          res.render('receipt/receipt', {informations:information[0],result:result[0],orders:orders,products:test5,total_price:total_price[0].total_sum});
                
  })



module.exports = router;