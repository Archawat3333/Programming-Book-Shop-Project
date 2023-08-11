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

//Register
router.get('/' ,(req, res) => {
    sql = 'SELECT * FROM tb_imformation';
    conn.query(sql, (err,information) => {
      res.render('register/register',{information:information[0],text:'',num:''});
    })
  });

  //Register
router.post('/' ,(req, res) => {
    let sql = 'INSERT INTO tb_user(name, email, pwd) VALUES(?, ?, ?)';
    let params = [
      req.body['name'],
      req.body['email'],
      req.body['pwd'],
    ];
    let sql2 = 'SELECT * FROM tb_imformation';
    conn.query(sql2, (err,information) => {
  
    let sql3 = 'SELECT email FROM tb_user where email = ?';
    let p1 = req.body.email;
    conn.query(sql3,p1, (err,email) => {
  
    let sql4 = 'SELECT name FROM tb_user where name = ?';
    let p2 = req.body.name;
    conn.query(sql4,p2, (err,name) => {
  
    if ((req.body.email == '')) {
      res.render('register/register', {information:information[0],text:'Email cannot be empty',num:'1'})
    }
  
    else if (email.length > 0) {
      res.render('register/register', {information:information[0],text:'This e-mail already exists in the system.',num:'5'})
    }
  
    else if ((req.body.name == '')) {
      res.render('register/register', {information:information[0],text:'Name cannot be empty',num:'2'})
    }
  
    else if (name.length > 0) {
      res.render('register/register', {information:information[0],text:'This name already exists in the system.',num:'6'})
    }
  
    else if ((req.body.pwd == '')) {
      res.render('register/register', {information:information[0],text:'Password cannot be empty',num:'3'})
    }
  
    else if ((req.body.pwd.length < 8)) {
      res.render('register/register', {information:information[0],text:'Password should be at least 8 letters or numbers',num:'7'})
    }
      
    else if ((req.body['pwd'] != req.body['pwd2'])) {
      res.render('register/register', {information:information[0],text:'Password not match',num:'4'})
    }
    else {
      conn.query(sql, params, (err, result) => {
        if (err) throw err;
        res.redirect('/regsuc');
      });
    }
  });
  
    });
  
    });
  
  });

module.exports = router;