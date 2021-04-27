var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var tradeType = req.body.tradeType;
    var contactNumber = req.body.number;
    var address = req.body.address;
    var status = req.body.status;
    var account = req.body.account;
    var actions = req.body.action;
   

    var seller_query ={
        text: 'INSERT INTO sellerManagement (name,email,tradeType,contactNumber,address,status, account, action) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);',
        values: [name, email, tradeType, contactNumber, address, status, account, actions]
      }
      pool.query (seller_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
  var name = req.body.name;
  var email = req.body.email;
  var contactNumber = req.body.number;
  var address = req.body.address;
  var tradeType = req.body.type;
  var status = req.body.status;
  var account = req.body.account;
  var actions = req.body.action;
  
    var id = req.params.id;
    var seller_query ={
        text: 'UPDATE sellerManagement SET name=$1 email=$2 tradeType=$3 contactNumber=$4 address=$5  status=$6 account=$7 action=$8 WHERE id = $9;',
        values: [name, email, tradeType, contactNumber, address, status, account, actions, id]
      }
      pool.query (seller_query,(err,req)=>{
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
        text: 'DELETE FROM sellerManagement WHERE id= $1',
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
        text: 'SELECT *  FROM sellerManagement',
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
        text: 'SELECT *  FROM sellerManagement WHERE id = $1',
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