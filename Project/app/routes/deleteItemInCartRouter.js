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

  router.get('/:id',  (req, res) => {
    let cart = req.session.card;

    for (let i = 0 ; i < cart.length ; i++) {
      if (cart[i].product_id == req.params.id) {
        cart.splice(i,1); //ใช้ splice เพื่อลบลำดับ item ใน array
      }
    }

    req.session.card = cart;
    res.redirect('/mycart');
  });
  



module.exports = router;