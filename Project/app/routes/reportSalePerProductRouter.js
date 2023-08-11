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

  router.get('/', isLogin, async (req, res) => {
    let conn = require('./connect2');
    let sql = 'SELECT * FROM tb_product';
    let [rows, fields] = await conn.query(sql);
    let arr = [];
    const data = {
      labels: ["1", "2", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Sales",
          data: [1200, 1900, 3000, 500, 2000, 300],
          backgroundColor: "rgba(75, 192, 192, 0.6)"
        }
      ]
    };
    
    for (let i = 0; i < rows.length; i++) {
      let product = rows[i];
      let barcode = product.barcode;
      let name = product.name;
      let id = product.id;
  
      sql = ' SELECT SUM(qty * price) AS totalPrice FROM tb_order_detail';
      sql += ' LEFT JOIN tb_order ON tb_order.id = tb_order_detail.order_id';
      sql += ' WHERE tb_order_detail.product_id = ?';
      sql += ' AND tb_order.pay_date IS NOT NULL';//เช็คว่าจ่ายเงินหรือยัง
  
      let [rows2, field2] = await conn.query(sql, [id]);
      let totalPrice = rows2[0].totalPrice;
      
      let p = { //การสร้าง object ขึ้นมาเก็บข้อมูล
        totalPrice : totalPrice,
        barcode : barcode,
        id : id,
        name : name
      }
  
  
      arr.push(p);
    }
    let sql_i = 'SELECT * FROM tb_imformation';
    let [information] = await conn.query(sql_i);
    res.render('report/reportSalePerProduct', {arr: arr,informations : information[0],data:data});
    
  });



module.exports = router;