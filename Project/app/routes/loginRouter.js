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

router.post('/', function(req, res) {
    // let email = req.body.email;
    // let password = req.body.pwd;
    // const test =  {email=req.body,password=req.body} 

    let sql = 'SELECT * FROM tb_user WHERE email = ? AND pwd = ?';
    let params = [
        req.body.email,
        req.body.pwd,
    ];


    sql2 = 'SELECT * FROM tb_imformation';
   conn.query(sql2, (err,information) => {

    if (req.body.email == '' || req.body.pwd == '') {
      res.render('login/login', {information:information[0],text:'Email or Password Cannot be empty',num:'1'})

    }
    else {
    conn.query(sql, params, (err, result) => {
        if (err) throw err;
        
          if (result.length > 0) {

            let user = result[0];
            req.session.iduser = user.id;
            let id = user.id;
            let name = user.name;


            req.session.token = jwt.sign({ id: id, name: name }, secertCode);
            req.session.name = user.name;
            req.session.level = user.level;
            req.session.email = user.email;
            req.session.profile = user.profile;


             res.redirect('/logsuc');

        } else {
          
            res.render('login/login', {information:information[0],text:'Email or Password incorrect !',num:'2'})
        
        }
       
        
    });
  }
  })
});
//Function Login
function isLogin(req, res, next) { //MiddleWare
  if (req.session.token != undefined) {
    next();
  }
  else {
    res.redirect('/login');
  }
};

router.get('/', function(req, res) {
    sql = 'SELECT * FROM tb_imformation';
    conn.query(sql, (err,information) => {
      sql2 = 'SELECT * FROM tb_user';
      conn.query(sql2, (err,information2) => {
      res.render('login/login',{information:information[0],user:information2,text:'',num:''});
      })
    })
  });

  

  module.exports = router;