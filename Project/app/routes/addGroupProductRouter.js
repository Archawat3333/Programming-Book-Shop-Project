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

  router.get('/',isLogin ,(req, res) => {
    sql_test = 'SELECT * FROM tb_imformation';
    if (req.session.level == 'admin') {
          conn.query(sql_test ,(err,information) => {
            res.render('GroupProduct/addGroupProduct', {groupProduct: {},text:'เพิ่ม',informations:information[0]}); //เป็นการโยน object เปล่าๆ เพื่อกันerror หรือหาค่าไม่เจอ
          })
        }
        else {
          res.redirect('/');
        }
  });
  
  router.post('/', isLogin, (req, res) => {
    let sql = 'INSERT INTO tb_group_product SET ?';
    let params = req.body;
    conn.query(sql, params, (err, result) => {
      if (err) throw err;
      res.redirect('/groupProduct'); 
    })
  })
module.exports = router;