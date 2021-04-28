var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{

    var buyerId = req.body.buyerId;
    var buyerName = req.body.buyerName;
    var customerName = req.body.customerName;
    var email = req.body.email;
    var phone = req.body.phone;
    var status = req.body.status;
    var actions = req.body.action;

    var buyerSavedQuotes_query ={
        text: 'INSERT INTO buyerquotesmanagement (buyer_id,buyer_name, customer_name, email, phone, status,action) VALUES ($1,$2,$3,$4,$5,$6,$7);',
        values: [buyerId, buyerName, customerName, email, phone, status, actions]
      }
      pool.query (buyerSavedQuotes_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
  
    var buyerId = req.body.buyerId;
    var buyerName = req.body.buyerName;
    var customerName = req.body.customerName;
    var email = req.body.email;
    var phone = req.body.phone;
    var status = req.body.status;
    var actions = req.body.action;
    
  var buyerSavedQuotes_query ={
        text: 'UPDATE buyerquotesmanagement SET buyer_id=$1 buyer_name=$2 customer_name=$3 email=$4 phone=$5 status=$6 action=$7 WHERE id = $8;',
        values: [buyerId, buyerName, customerName, email, phone, status, actions, id]
      }
      pool.query (buyerSavedQuotes_query,(err,req)=>{
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
    var buyerSavedQuotes_query ={
        text: 'DELETE FROM buyerquotesmanagement WHERE id= $1',
        values: [id]
      }
      pool.query (buyerSavedQuotes_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var buyerSavedQuotes_query ={
        text: 'SELECT *  FROM buyerquotesmanagement',
      }
      pool.query (buyerSavedQuotes_query,(err,req)=>{
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
    var buyerSavedQuotes_query ={
        text: 'SELECT *  FROM buyerquotesmanagement WHERE id = $1',
        values: [id]
      }
      pool.query (buyerSavedQuotes_query,(err,req)=>{
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