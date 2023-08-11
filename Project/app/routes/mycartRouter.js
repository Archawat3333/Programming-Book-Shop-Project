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

  
  router.get('/', async (req, res) => {
    let conn = require('./connect2'); //การเชื่อมต่อแบบ async await
    let cart = req.session.card; //การรับ card ที่เก็บใน session
    let products = [];
    let totabl_qty = 0;
    let total_price = 0;
    if (cart.length > 0) { 
      for (let i = 0; i < cart.length; i++) { //การค้นหาสินค้าที่มีใน card
        let c = cart[i];
        let sql = 'SELECT * FROM tb_product WHERE id = ?';
        let params = [c.product_id];

        let [rows, fields] = await conn.query(sql, params);

        let product = rows[0];

        let p = { //เก็บรายละเอียดสินค้าที่ผู้ใช้สั่งซื้อ
          qty: c.qty,
          id: product.id,
          barcode: product.barcode,
          name: product.name,
          price: product.price,
          img: product.img
        }

        products.push(p);

        totabl_qty += parseInt(c.qty);
        total_price += (c.qty * product.price);
      }
    }
    sql_test = 'SELECT * FROM tb_imformation';
    let [information] = await conn.query(sql_test); //การ query อันสอง
    
      res.render('Card/mycart',{products: products, total_qty: totabl_qty, total_price: total_price,informations:information[0]});
    });



module.exports = router;