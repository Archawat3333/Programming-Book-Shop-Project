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

  router.get('/:id' , (req, res) => {

    let sql = 'SELECT * FROM tb_product WHERE id = ?';
    let view_id = req.params.id;
    conn.query(sql, view_id, (err,result) => {
      if (err) throw err;
      let product = result[0];
      let cart = req.session.card;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_id == product.id) {
          
          product.qty = parseInt(cart[i].qty);
        }
      }
      let sql2 = 'SELECT tb_group_product.name,tb_group_product.id FROM tb_group_product LEFT JOIN tb_product ON tb_group_product.id = tb_product.id  ORDER BY tb_group_product.name ASC;';

      let sql3 = 'SELECT * FROM tb_imformation';
      

      conn.query(sql,view_id, (err,result) => {
        if (err) throw err;
        conn.query(sql2, (err,result2) => {
          conn.query(sql3, (err,information) => {
            res.render('viewDetail/viewDetail',{result:product,result2:result2,product:{},informations:information[0]});
          })  
        })
      })
    })

  })

  



module.exports = router;