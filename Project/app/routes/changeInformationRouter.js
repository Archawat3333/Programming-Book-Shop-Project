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











 

  


  router.get('/', isLogin , (req, res) => {
    let sql = 'SELECT * FROM tb_imformation';
    if (req.session.level == 'admin') {
    conn.query(sql, (err, result) => {
    if (err) throw err;
    sql_test = 'SELECT * FROM tb_imformation';
        conn.query(sql_test ,(err,information) => {
          res.render('Information/changeInformation', {product: result[0],informations:information[0]});
        })
  });
}
  else {
    res.redirect('/');
  }
  })

  router.post('/', isLogin, (req, res) => {

    let form = new formidable.IncomingForm();
      let conn = require('./connect2');

      form.parse(req, (err, fields, file) => { //fields มาจากฟอร์ม enctype หน้า addProduct.ejs
      let filePath = file.img.filepath; //img คือชื่อที่ตั้ง ส่วน filepath คือตำแหน่งที่เก็บรูปภาพ
      let newPath = 'C://full-stack/day12/app/public/images/';
      newPath += file.img.originalFilename;
      
      fs.copyFile(filePath, newPath, async () => {
         //insert order
         let sql = 'UPDATE tb_imformation SET name = ?, img = ?,address=?,email=?,phone=?,bank=?,numbank=?,namebank=?,pp=?';
        let params = [
        fields['name'],
        file.img.originalFilename, //ชื่อภาพ
        fields['address'],
        fields['email'],
        fields['phone'],
        fields['bank'],
        fields['numbank'],
        fields['namebank'],
        fields['pp'],

      ];

      conn.query(sql, params, (err, result) => {
        if (err) throw err;
      })
    })
    res.redirect('/');
  })
})
  



module.exports = router;