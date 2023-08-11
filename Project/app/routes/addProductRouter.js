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

  router.get('/',isLogin ,(req, res) => {
    let sql = 'SELECT * FROM tb_group_product ORDER BY name';
    if (req.session.level == 'admin') {
    conn.query(sql, (err, result) => {
      if (err) throw err;
      sql_test = 'SELECT * FROM tb_imformation';
          conn.query(sql_test ,(err,information) => {
            res.render('Product/addProduct', {product: {}, groupProducts: result,informations:information[0],text:'เพิ่ม'});
  
          })
    })
  }
    else {
      res.redirect('/');
    }
    
  });
  
  router.post('/',isLogin ,(req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => { //fields มาจากฟอร์ม enctype หน้า addProduct.ejs
      let filePath = file.img.filepath; //img คือชื่อที่ตั้ง ส่วน filepath คือตำแหน่งที่เก็บรูปภาพ
      let newPath = 'C://full-stack/day12/app/public/images/';
      newPath += file.img.originalFilename;
  
      fs.copyFile(filePath, newPath, () => {
        //insert into database
        let sql = 'INSERT INTO tb_product(group_product_id, barcode, name, cost, price,des,pagelen,lau,pub,size,stock, img, created_date) VALUES(?, ?, ?, ?, ?,?,?,?,?,?,?, ?,NOW())';
        let params = [
          fields['group_product_id'], //เราจะไม่ใช้ req.body แต่จะใช้ fields แทน
          fields['barcode'],
          fields['name'],
          fields['cost'],
          fields['price'],
          fields['des'],
          fields['pagelen'],
          fields['lau'],
          fields['pub'],
          fields['size'],
          fields['stock'],
  
  
          file.img.originalFilename //ชื่อภาพ
        ];
        conn.query(sql, params, (err, result) => {
          if (err) throw err;
          res.redirect('/product');
        })
      })
    })
  });



module.exports = router;