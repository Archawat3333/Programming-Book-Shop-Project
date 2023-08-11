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

router.get('/', function(req, res) {
  sql = 'SELECT * FROM tb_imformation';
  conn.query(sql, (err,information) => {
    res.render('resetPassword/resetPassword',{information:information[0],num:'',text:''});
  })
});

router.post('/', function(req, res) {

    let sql = 'UPDATE tb_user SET pwd = ? WHERE token = ?';
    let params = [req.body['pwd'],
      req.body['token']];
  
      sql8 = 'SELECT * FROM tb_imformation';
      conn.query(sql8, (err,information) => {
      
      let sql5 = 'SELECT token FROM tb_user where token = ?';
      let p = req.body.token
      conn.query(sql5,p, (err,token_s) => {
  
        if ((req.body.pwd == '')) {
          res.render('resetPassword/resetPassword', {information:information[0],text:'Password cannot be empty',num:'1'})
        }
      
        else if ((req.body.pwd.length < 8)) {
          res.render('resetPassword/resetPassword', {information:information[0],text:'Password should be at least 8 letters or numbers',num:'2'})
        }
      
        else if (req.body['pwd'] != req.body['pwd2']) {
          res.render('resetPassword/resetPassword', {information:information[0],text:'Password not match',num:'3'})
        }
      
        else if (token_s.length <= 0 ) {
          res.render('resetPassword/resetPassword', {information:information[0],text:'Incorrect PIN',num:'4'})
        }
        
        else {
          conn.query(sql, params, (err,result_token) => {
            if (err) throw err;
      
              let params = [null,
                req.body['pwd']];
                let sql2 = 'UPDATE tb_user SET token = ? WHERE pwd = ?';
                conn.query(sql2, params, (err,result) => {
                })
              res.redirect('/resuc');
          });
        }
  
      })
  
     });
    
  
     
  
    });

module.exports = router;