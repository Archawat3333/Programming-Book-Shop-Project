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

// User page
router.get('/', isLogin, async function(req, res, next) {
    let conn = require('./connect2');
    let params = [];
    let sql = ' SELECT * FROM tb_product ';
  
  if (req.query.search != undefined) {
    sql += 'WHERE name LIKE(?)';
    params.push('%' + req.query.search + '%');
  }
  
  if (req.query.groupProductId != undefined) {
    sql += ' WHERE group_product_id = ?';
    params.push(req.query.groupProductId);
  }
  
    sql += ' ORDER BY id DESC';
  
    try {
    let [products, fields] = await conn.query(sql,params,); //การ query อันแรก
    
    sql = 'SELECT * FROM tb_group_product ORDER BY name ASC';
    let [groupProducts, fieldsGroupProducts] = await conn.query(sql,params,); //การ query อันสอง
  
    if (req.session.card == undefined) {
      req.session.card = [];
    }
  
    sql_test = 'SELECT * FROM tb_imformation';
    let [information] = await conn.query(sql_test); //การ query อันสอง
  
    res.render('member/member', { products: products , groupProducts: groupProducts,information:information[0]});
  } catch (e) {
    res.send('Error : ' + e)
  }
  });

module.exports = router;