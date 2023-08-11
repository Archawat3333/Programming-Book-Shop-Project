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




  router.get('/:id',isLogin ,(req, res) => {
    let sql = 'DELETE FROM tb_group_product WHERE id = ?';
    let params = [ req.params.id];
    if (req.session.level == 'admin') {
    conn.query(sql, params, (err,result) => {
      if (err) throw err;
      res.redirect('/groupProduct');
    })
  }
    else {
      res.redirect('/');
    }
  });


module.exports = router;