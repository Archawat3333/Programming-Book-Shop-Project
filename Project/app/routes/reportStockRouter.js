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

  
  router.get('/', isLogin , async (req, res) => {

    let sql = 'SELECT * FROM tb_product ORDER BY name ASC';
    let conn = require('./connect2');
    let arr = [];

    try{
      let [products, fields] = await conn.query(sql);

      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let params = [product.id];

        sql = 'SELECT SUM(qty) AS qtyIn FROM tb_stock_in WHERE product_id = ?';
        let [stockIn] = await conn.query(sql, params);

        sql = 'SELECT SUM(qty) AS qtyOut FROM tb_stock_out WHERE product_id = ?';
        let [stockOut] = await conn.query(sql, params);

        let objProduct = {
          id : product.id,
          barcode :product.barcode,
          name : product.name,
          qtyIn : stockIn[0].qtyIn,
          qtyOut: stockOut[0].qtyOut
        }
        arr.push(objProduct);
      }
      res.render('report/reportStock', {arr:arr});

    }catch(e) {
      res.send('Error : ' + e);
    }

  })


module.exports = router;