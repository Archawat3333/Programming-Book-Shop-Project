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

//----------------------------------------------------------------------------------------------------
router.get('/',isLogin ,(req, res) => {
    let data = jwt.verify(req.session.token, secertCode);
    let sql = 'SELECT * FROM tb_user WHERE id =?';
    let params = [data.id];
  
    conn.query(sql, params, (err, result) => {
      if (err) throw err;
      sql_test = 'SELECT * FROM tb_imformation';
          conn.query(sql_test ,(err,information) => {
            res.render('profile/changeProfile', {user : result[0],informations:information[0]});
          })
    })
  });
  
  router.post('/',isLogin ,(req, res) => {
    let data = jwt.verify(req.session.token, secertCode);
    let sql = 'UPDATE tb_user SET profile = ? , name = ?, email = ?, pwd = ? WHERE id = ?';
    console.log(data)
    let params = [
      req.body['profile'],
      req.body['name'],
      req.body['email'],
      req.body['pwd'],
      data.id
    ]
    // if(req.body['pwd'] != undefined) {
    //   sql += ', pwd = ?';
    //   params.push(req.body['pwd']); //การเพิ่มค่า pwd ที่ผู้ใช้กรอกเข้าในตัวแปร params
    // }
  
    conn.query(sql, params, (err, result) => {
      if (err) throw err;
      res.redirect('/login');
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

  
module.exports = router;