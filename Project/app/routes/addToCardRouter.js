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

  router.get('/:id' ,(req, res) => {
    let card = [];
    let order = {
      product_id: req.params.id,
      qty:1
  };

    if(req.session.card == null) {
      //first item
      card.push(order);
  }
    else {
      //second item
      card = req.session.card;
      let newItem = true;

      for (let i =0; i < card.length; i++) { //วนหา item ในตระกร้า
        if (card[i].product_id == req.params.id) { // ถ้าในตระกร้ามีค่า = สินค้าที่ผู้ใช้เลือก 
          card[i].qty = parseInt(card[i].qty) + 1; //สินค้าเดิมจะเก็บแค่จำนวนสินค้า
          newItem = false;
        }
      }

      if (newItem) { //จะเข้าเวื่อนไขก็ต่อเมื่อ เป็นสินค้าใหม่ที่ผู้ใช้เลือก
        card.push(order); //push ลง array
      }
    }

    req.session.card = card; 
    res.redirect('/viewDetail/'+req.params.id);

  });

  



module.exports = router;