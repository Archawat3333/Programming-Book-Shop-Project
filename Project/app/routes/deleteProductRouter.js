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

  
  router.get('/:id/:img',isLogin ,(req, res) => {

    let newPath = 'C://full-stack/day12/app/public/images/';
    newPath += req.params.img;
    if (req.session.level == 'admin') {

    fs.unlink(newPath, (err) => { //การลบในโฟลเดอร์ images หรือลบจากhard_disk
    if (err) throw err;

    
    let sql = 'DELETE FROM tb_product WHERE id = ?'; //การลบในฐานข้อมูล
    let params = req.params.id;
    
    conn.query(sql, params, (err, result) => {
      if (err) throw err;
      res.redirect('/product');
    })
    })
  }
    else {
      res.redirect('/');
    }
  });


module.exports = router;