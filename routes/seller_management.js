var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();


router.post('/create',(req,res)=>{
  console.log(req.headers.authorization);
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);

    var name = req.body.name;
    var email = req.body.email;
    var tradeType = req.body.tradeType;
    var contact = req.body.number;
    var address = req.body.address;
    var status = req.body.status;
    var account = req.body.account;
    var actions = req.body.actions;
    var person_id = decoded.users.id;
    
    var buyer_query ={
        text: 'INSERT INTO sellermanagement (name,email,tradeType,number,address, created_by, modified_by, created_at, modified_at, status,account,actions) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
        values: [name, email, tradeType, contact, address, person_id, person_id, isoDateString, isoDateString, status, account,actions]
      }
      pool.query (buyer_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);

  var name = req.body.name;
  var email = req.body.email;
  var tradeType = req.body.tradeType;
  var contact = req.body.number;
  var address = req.body.address;
  var status = req.body.status;
  var account = req.body.account;
  var actions = req.body.action;
  var id = req.params.id;
  var person_id = decoded.users.id;

  var buyer_query ={
        text: 'UPDATE sellermanagement SET name=$1 email=$2 tradeType=$3 number=$4 address=$5 modified_by=$6 modified_at=$7 status=$8 account=$9 action=$10 WHERE id = $11;',
        values: [name, email, tradeType, contact, address, person_id, isoDateString, status, account, actions, id]
      }
      pool.query (buyer_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully changed"});
        }
      })  
    
});
router.delete('/delete/:id',(req,res)=>{
    var id = req.params.id;
    var seller_query ={
        text: 'DELETE FROM sellermanagement WHERE id= $1',
        values: [id]
      }
      pool.query (seller_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var seller_query ={
        text: 'SELECT *  FROM sellermanagement',
      }
      pool.query (seller_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:req.rows});
        }
      })  
    
});
router.get('/getby_id/:id',(req,res)=>{
    var id = req.params.id;
    var seller_query ={
        text: 'SELECT *  FROM sellermanagement WHERE id = $1',
        values: [id]
      }
      pool.query (seller_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          console.log(req)
          res.json({success: true, msg:req.rows});
        }
      })  
});

module.exports = router;