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


const randomstring = require('randomstring');


const nodemailer = require('nodemailer');

const sendMail_ForgotPassword = async (email, mailSubject,content) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth : {
                user: "mukdahan5731@gmail.com",
                pass: "qewignnadkjojgcg"
                
            }
        });
        
        const option = {
            from : "mukdahan5731@gmail.com",
            to : email,
            subject: mailSubject,
            html : content
        
        };
        
        transporter.sendMail(option, function(err, info)  {
            if (err) {
                console.log(err);
                return;
            } 
            console.log("Sent: " + info.response);
        });

    } catch(err) {
        console.log(error.message);
    }
}

const sendMail_OrderFromMember = async (email, mailSubject,content) => {
  try {

      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth : {
              user: "mukdahan5731@gmail.com",
              pass: "qewignnadkjojgcg"
              
          }
      });
      
      const option = {
          from : "mukdahan5731@gmail.com",
          to : email,
          subject: mailSubject,
          html : content,
      
      };
      
      transporter.sendMail(option, function(err, info)  {
          if (err) {
              console.log(err);
              return;
          } 
          console.log("Sent: " + info.response);
      });

  } catch(err) {
      console.log(error.message);
  }
}

const sendMail_OrderToMember = async (email, mailSubject,content) => {
  try {

      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth : {
              user: "mukdahan5731@gmail.com",
              pass: "qewignnadkjojgcg"
              
          }
      });
      
      const option = {
          from : "mukdahan5731@gmail.com",
          to : email,
          subject: mailSubject,
          html : content,
      
      };
      
      transporter.sendMail(option, function(err, info)  {
          if (err) {
              console.log(err);
              return;
          } 
          console.log("Sent: " + info.response);
      });

  } catch(err) {
      console.log(error.message);
  }
}



//การประกาศ Session
router.use(session({
  secret: 'secretkeybym',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 30 * 24 * 60 * 60 * 1000
   }
}))

router.use((req, res, next) => {
  res.locals.session = req.session; //คือการเอาค่า session เก็บในตัวแปร locals ซึ่งจะทำให้เรียกใช้ session ผ่าน ejs ไฟล์อื่นๆได้
  res.locals.numeral = numeral; //การผูก numeral เข้าไปในตัวแปร local เพื่อให้มองเห็นทั้งหมด
  res.locals.dayjs = dayjs;
  res.locals.dayFormat = dayFormat;
  next();
})
// User page
router.get('/',  async function(req, res, next) {
  let conn = require('./connect2');
  let params = [];
  let sql = ' SELECT * FROM tb_product ';

if (req.query.search != undefined) {
  sql += 'WHERE name LIKE(?)';
  params.push('%' + req.query.search + '%');
}

if (req.query.groupProductId != undefined) {
  sql += ' WHERE group_product_id = ?';
  params.push(req.query.groupProductId);
}

  sql += ' ORDER BY id DESC';

  try {
    
  
  let [products, fields] = await conn.query(sql,params,); //การ query อันแรก
  
  sql = 'SELECT * FROM tb_group_product ORDER BY name ASC';
  let [groupProducts, fieldsGroupProducts] = await conn.query(sql,params,); //การ query อันสอง

  sql_test = 'SELECT * FROM tb_imformation';
  let [information] = await conn.query(sql_test); //การ query อันสอง
  console.log(information);

  
  if (req.session.card == undefined) {
    req.session.card = [];
  }
  
  res.render('index/index', { products: products , groupProducts: groupProducts, informations:information[0]});

} catch (e) {
  res.send('Error : ' + e)
}
});


const homeRouter = require('../routes/homeRouter');
const loginRouter = require('../routes/loginRouter');
const resetPasswordRouter = require('../routes/resetPasswordRouter');
const registerRouter = require('../routes/registerRouter');
const changeProfileRouter = require('../routes/changeProfileRouter');
const userRouter = require('../routes/userRouter');
const addUserRouter = require('../routes/addUserRouter');
const editUserRouter = require('../routes/editUserRouter');
const logoutRouter = require('../routes/logoutRouter');
const deleteUserRouter = require('../routes/deleteUserRouter');
const groupProductRouter = require('../routes/groupProductRouter');
const addGroupProductRouter = require('../routes/addGroupProductRouter');
const editGroupProductRouter = require('../routes/editGroupProductRouter');
const deleteGroupProductRouter = require('../routes/deleteGroupProductRouter');
const addProductRouter = require('../routes/addProductRouter');
const productRouter = require('../routes/productRouter');
const editProductRouter = require('../routes/editProductRouter');
const deleteProductRouter = require('../routes/deleteProductRouter');
const addToCardRouter = require('../routes/addToCardRouter');
const mycartRouter = require('../routes/mycartRouter');
const deleteItemInCartRouter = require('../routes/deleteItemInCartRouter');
const editItemInCartRouter = require('../routes/editItemInCartRouter');
const viewDetailRouter = require('../routes/viewDetailRouter');
const userAddRouter = require('../routes/userAddRouter');
const confirmOrderSuccessRouter = require('../routes/confirmOrderSuccessRouter');
const orderRouter = require('../routes/orderRouter');
const orderInfoRouter = require('../routes/orderInfoRouter');
const deleteOrderRouter = require('../routes/deleteOrderRouter');
const deleteOrderMemberRouter = require('../routes/deleteOrderMemberRouter');
const payOrderRouter = require('../routes/payOrderRouter');
const reportSalePerProductRouter = require('../routes/reportSalePerProductRouter');
const trackOrderRouter = require('../routes/trackOrderRouter');
const reportStockRouter = require('../routes/reportStockRouter');
const graphRouter = require('../routes/graphRouter');
const changeInformationRouter = require('../routes/changeInformationRouter');
const changeHighLightRouter = require('../routes/changeHighLightRouter');
const receiptRouter = require('../routes/receiptRouter');
const edituseraddRouter = require('../routes/edituseraddRouter');
const deleteGroupuseraddRouter = require('../routes/deleteGroupuseraddRouter');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/groupProduct', groupProductRouter);

router.use('/addUser', addUserRouter);
router.use('/addGroupProduct', addGroupProductRouter);
router.use('/addProduct', addProductRouter);
router.use('/addToCard', addToCardRouter);

router.use('/edituseradd', edituseraddRouter);
router.use('/editUser', editUserRouter);
router.use('/editGroupProduct', editGroupProductRouter);
router.use('/editProduct', editProductRouter);
router.use('/editItemInCart', editItemInCartRouter);

router.use('/deleteGroupuseradd', deleteGroupuseraddRouter);
router.use('/deleteUser', deleteUserRouter);
router.use('/deleteGroupProduct', deleteGroupProductRouter);
router.use('/deleteProduct', deleteProductRouter);
router.use('/deleteItemInCart', deleteItemInCartRouter);
router.use('/deleteOrder', deleteOrderRouter);
router.use('/deleteOrderMember', deleteOrderMemberRouter);

router.use('/home', homeRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/resetPassword', resetPasswordRouter);
router.use('/register', registerRouter);
router.use('/receipt', receiptRouter);
router.use('/mycart', mycartRouter);
router.use('/viewDetail', viewDetailRouter);
router.use('/userAdd', userAddRouter);
router.use('/graph', graphRouter);

router.use('/changeProfile', changeProfileRouter);
router.use('/changeInformation', changeInformationRouter);
router.use('/changeHighLight', changeHighLightRouter);

router.use('/confirmOrderSuccess', confirmOrderSuccessRouter);
router.use('/order', orderRouter);
router.use('/orderInfo', orderInfoRouter);
router.use('/payOrder', payOrderRouter);
router.use('/trackOrder', trackOrderRouter);

router.use('/reportSalePerProduct', reportSalePerProductRouter);
router.use('/reportStock', reportStockRouter);



router.get('/forgotPassword', function(req, res) {
  sql = 'SELECT * FROM tb_imformation';
  conn.query(sql, (err,information) => {

    res.render('forgotPassword/forgotPassword',{information:information[0],num:'',text:''});
  })
});

router.get('/forsuc' ,function(req, res) {

  res.render('forsuc/forsuc');

});

router.post('/forgotPassword', function(req, res) {
  let sql = 'SELECT * FROM tb_user WHERE email = ? limit 1';
  let email = req.body.email;
  conn.query(sql, email, (err,result_email) => {

      const randomString = randomstring.generate();
      
      const gpc = require('generate-pincode');
      const pin = gpc(4);

      let params = [pin,
      email];

      let sql6 = 'SELECT * FROM tb_imformation';
      conn.query(sql6, (err,information) => {
      
      let sql5 = 'SELECT email FROM tb_user where email = ?';
      let p2 =  req.body.email;
      conn.query(sql5, p2, (err,email2) => {

      if (req.body.email == '') {
        res.render('forgotPassword/forgotPassword', {information:information[0],text:'Email cannot be empty',num:'1'})
      }  
      
      else if (email2.length <= 0) {
        res.render('forgotPassword/forgotPassword', {information:information[0],text:'Invalid email',num:'2'})
      }

      else { 
      let sql2 = 'UPDATE tb_user SET token = ? WHERE email = ?';
      conn.query(sql2,params, (err,result) => {

      let mailSubject = 'Reset Password';

      let content = 
              '<h1 style="color: black;"> Programming Book Shop</h1>' +
              '<div style="color: black;"> Dear : ' + result_email[0].name + '</div>' +
              '<div>'+
              '<div> Here is your pin number : <b>' + pin + '</b> </div>' +
              '<div>' +
              '<div>Please <a href="http://localhost:3000/resetPassword?token='+randomString+'"> <b><u> click here </u></b></a> to reset your password.'+
              
              '<h2 style="color : red "> Warning ! </h2>' +
              '<p>1.You will be redirected to a password reset page.</p>' + 
              '<p>2.Choose a strong and secure password.</p>' +
              '</div>';
      sendMail_ForgotPassword(email, mailSubject, content);
      res.redirect('/forsuc');
      });
    }
    
  });
});

});
});

router.get('/confirmOrder',  (req, res) => {
  sql_test = 'SELECT * FROM tb_imformation';
  let sql_test2 = 'SELECT * FROM user_add WHERE idlog = ?';
  let params =  req.session.iduser;
  conn.query(sql_test ,(err,information) => {
    conn.query(sql_test2,params ,(err,products) => {
    
    res.render('Order/confirmOrder', {informations:information[0],products:products,product:'gg'});

    });

  })
});

router.post('/confirmOrder', async (req, res) => {
  let form = new formidable.IncomingForm();
  let conn = require('./connect2');

  form.parse(req, (err, fields, file) => { //fields มาจากฟอร์ม enctype หน้า addProduct.ejs
  let filePath = file.img.filepath; //img คือชื่อที่ตั้ง ส่วน filepath คือตำแหน่งที่เก็บรูปภาพ
  let newPath = 'C://full-stack/day12/app/public/images/';
  newPath += file.img.originalFilename;
  
  fs.copyFile(filePath, newPath, async () => {
     //insert order
  let sql = 'INSERT INTO tb_order(img, useradd_id, created_date) VALUE(?,?, NOW())';
  let params = [
    file.img.originalFilename, //ชื่อภาพ
    fields['addressuser'],
  ];
  let sql_ser = 'SELECT * FROM tb_order WHERE useradd_id = ? ORDER BY id DESC'
  let params_s =  fields['addressuser'];

  
  let con_id = fields['addressuser'];

      let [rows] = await conn.query(sql, params);

      let [result_s] = await conn.query(sql_ser, params_s);

      let sql10 = 'INSERT INTO tb_detail_order(user_add_id,order_id) VALUE(?,?)';
      let params10 = [
        fields['addressuser'],
        result_s[0].id,
  ];
      
      let [re] = await conn.query(sql10, params10);


      let lastId = rows.insertId;
      let carts = req.session.card;

      for (let i = 0; i < carts.length; i++) {
        let cart = carts[i];

        //find product data
        let sqlFindProduct = 'SELECT price FROM tb_product WHERE id = ?';
        params = [cart.product_id];
        let [rows, fields] = await conn.query(sqlFindProduct, params);
        let price = rows[0].price;

        //insert order_detail
        let sqlOrderDetail = 'INSERT INTO tb_order_detail(order_id, product_id, qty, price) VALUES(?, ?, ?, ?)';
        params = [
          lastId, //เอาจากฐานข้อมูลที่สร้างล่าสุด
          cart.product_id, //เอาจาตะกร้า
          cart.qty, //เอาจากตระกร้า
          price //ดึงจากฐานข้อมูลว่าสินค้านี้มีราคาเท่าไหร่
        ]
        await conn.query(sqlOrderDetail, params);

        let sqlQ = 'SELECT stock FROM tb_product WHERE id = ?';
        let paramsQ =  [cart.product_id];
        let [stock] = await conn.query(sqlQ, paramsQ);

        let totabl_stock = stock[0].stock - cart.qty;

        let sqlQ_U = 'UPDATE tb_product SET stock=? WHERE id = ?'
        let paramsQU= [
          totabl_stock,
          cart.product_id,
        ]
        let [total_s] = await conn.query(sqlQ_U, paramsQU);


      }

    
    let sql1 = 'SELECT * FROM tb_user WHERE email = ? limit 1';
    let email = 'gianmii5732@gmail.com';
    let [result] = await conn.query(sql1, email);

    let sql2 = 'SELECT DISTINCT user_add.name,user_add.phone,tb_order.id FROM user_add LEFT JOIN tb_order ON tb_order.useradd_id = user_add.id WHERE user_add.id = ? ORDER BY id DESC';
    let pp = con_id;
    let [result2] = await conn.query(sql2,pp);

    let mailSubject = 'Order In';


    let content = '<h1 style="color: black;"> Programming Book Shop</h1>' +
    '<p style="color: black;"> Dear Admin : ' + result[0].name + ', Please <a href="http://localhost:3000"> <b><u> click here </u></b></a> to check your order.</p>'+
    '<div>'+
    
    '<h4 > <b>Bill id : ' + result2[0].id + '</b></h4>' +
    '<h4 ><b>Member name : ' + result2[0].name + '</b></h4>' +
    '<h4 > <b>Phone number : ' + result2[0].phone + '</b></h4>' +
    '</div>';
    
    
    
    sendMail_OrderFromMember(email, mailSubject, content);
    req.session.card = []; //การล้างตะกร้าหลังซื้อ
    res.redirect('/'); //การ redirect จะวิ่งไป path ล่าง
  });
  })
});

router.get('/sendOrder/:id', isLogin, (req, res) => {
  sql_test = 'SELECT * FROM tb_imformation';
        conn.query(sql_test ,(err,information) => {
          res.render('Order/sendOrder', {orderId: req.params.id,informations:information[0]})
        })
})

router.post('/sendOrder/:id', isLogin, (req, res) => {
  let sql = 'UPDATE tb_order SET send_date = ?, track_name = ?, track_code = ?, send_remark = ?,status = ? WHERE id = ?';
  let status = 1;
  let params = [
    req.body['send_date'],
    req.body['track_name'],
    req.body['track_code'],
    req.body['send_remark'],
    status,
    req.params.id
  ]

  conn.query(sql, params, (err, result) => {
    if (err) throw err;
    
          

      let sql2 = 'SELECT DISTINCT user_add.name,user_add.email,user_add.phone,tb_order.id FROM user_add LEFT JOIN tb_order ON tb_order.useradd_id = user_add.id WHERE tb_order.id = ? AND tb_order.id IS NOT NULL';
      let pp = req.params.id;

        conn.query(sql2,pp,(err, result2) => {
          
        let email2 = result2[0].email;
        let mailSubject = 'Success Confirm Order !';
        let content = '<h1 style="color: black;"> Programming Book Shop</h1>' +
        '<p style="color: black;"> Dear member : ' + result2[0].name + ', Please <a href="http://localhost:3000"> <b><u> click here </u></b></a> to check your order.</p>'+
        '<div>'+

        '</div>';

        sendMail_OrderToMember(email2, mailSubject, content);
        })

    res.redirect('/order');
  })
});



router.get('/resuc' ,function(req, res) {

  res.render('resetPassword/resuc');

});

  router.get('/logsuc' ,function(req, res) {
      res.render('login/logsuc');
  });

//Function Login
function isLogin(req, res, next) { //MiddleWare
  if (req.session.token != undefined) {
    next();
  }
  else {
    res.redirect('/login');
  }
}

router.get('/regsuc' ,function(req, res) {

  res.render('register/regsuc');

});


module.exports = router;
