var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var pool = require('../config/db');
var multer = require('multer');

router.post('/login',(req,res)=>{
  var email = req.body.email;
  var password = req.body.password;
  var user = {
      name:email,
      pass:password
  };
  var ticket;
  jwt.sign({users:user},'EPARTS_2021',(err,token)=>{
      ticket=token;
  });

  var login_query ={
      name:'validate-user',
      text: 'SELECT * FROM public.users_login where email= $1  AND password= $2 ;',
      values: [email, password]
    }
      pool.query(login_query,(err, resq) => {
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          if (resq.rowCount)
          {
            res.json({ success: true, msg:"succesfully logged in",token:ticket, data:resq.rows[0]});
          }
          else{
            res.json({ success: false, msg: "Incorrect username or password" });
          }
        }
      });
});

module.exports = router;