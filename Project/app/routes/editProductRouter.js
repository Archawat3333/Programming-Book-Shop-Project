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

  
router.get('/:id',isLogin ,(req, res) => {
    let sql = 'SELECT * FROM tb_product WHERE id = ?';
    let params = req.params.id;
    if (req.session.level == 'admin') {
    conn.query(sql, params, (err, products) => {
      if (err) throw err;
  
      let sql = 'SELECT * FROM tb_group_product ORDER BY name';
      conn.query(sql, params, (err, groupProducts) => {
      if (err) throw err;
      sql_test = 'SELECT * FROM tb_imformation';
          conn.query(sql_test ,(err,information) => {
            res.render('Product/addProduct', {product: products[0],groupProducts: groupProducts,informations:information[0],text:'แก้ไข'} ); //products เอาไว้โชว์ค่าใน form ส่วน groupProducts จะ list ค่าใน combobox
          })
      })
    })
  }
    else {
      res.redirect('/');
    }
  });
  
  router.post('/:id',isLogin ,(req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => { //fields มาจากฟอร์ม enctype หน้า addProduct.ejs
      let filePath = file.img.filepath; //img คือชื่อที่ตั้ง ส่วน filepath คือตำแหน่งที่เก็บรูปภาพ
      let newPath = 'C://full-stack/day12/app/public/images/';
      let pathUpload = newPath + file.img.originalFilename;
  
      fs.copyFile(filePath, pathUpload, () => {
        let sqlSelect = 'SELECT img FROM tb_product WHERE id = ?';
        let paramsSelect = req.params.id;
        
        conn.query(sqlSelect, paramsSelect, (err, oldProducts) => {
          if (err) throw err;
          let product = oldProducts[0]; //ข้อมูลรูปเอามาจาก database
          fs.unlink(newPath + product.img, () => {
            if(err) {
              console.log(err);
            }
          });
  
          //insert into database
          let sql = 'UPDATE tb_product SET group_product_id=?, barcode=?, name=?, cost=?, price=?,des=?, pagelen=?,lau=?,pub=?,size=?,stock=?, img=? WHERE id = ?';
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
  
          file.img.originalFilename ,//ชื่อภาพ
          req.params.id //เอามาจาก /:id ด้านบน มาเก็บไว้ที่ params
        ];
  
        conn.query(sql, params, (err, result) => {
          if (err) throw err;
          res.redirect('/product');
        })
  
        })
      })
    })
  });

  



module.exports = router;