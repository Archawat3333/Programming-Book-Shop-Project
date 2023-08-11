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
    let sql = 'SELECT * FROM tb_product WHERE id = ?';
    let params = req.params.id;
    conn.query(sql, params, (err,result) => {
      if (err) throw err;
      let product = result[0];
      let cart = req.session.card;
      sql_test = 'SELECT * FROM tb_imformation';
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_id == product.id) {
          product.qty = cart[i].qty;
        }
      }
      conn.query(sql_test ,(err,information) => {
        res.render('Card/editItemInCart', {product:product, informations:information[0]});

      })
    })

  })

  router.post('/:id',  (req, res) => {
    let cart = req.session.card;

    for(let i = 0; i < cart.length; i ++) {
      if ( cart[i].product_id == req.params.id) {
        cart[i].qty = req.body['qty'];
      }
    }
    req.session.card = cart;
    res.redirect('/mycart');
  })
  



module.exports = router;