var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var contact = req.body.number;
    var address = req.body.address;
    var status = req.body.status;
    var actions = req.body.action;

    var buyer_query ={
        text: 'INSERT INTO buyerManagement (name,email,number,address,status,action) VALUES ($1,$2,$3,$4,$5,$6);',
        values: [name, email, contact, address, status, actions]
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
  var name = req.body.name;
  var email = req.body.email;
  var contact = req.body.number;
  var address = req.body.address;
  var status = req.body.status;
  var actions = req.body.action;
  var id = req.params.id;
    
  var buyer_query ={
        text: 'UPDATE buyerManagement SET name=$1 email=$2 number=$3 address=$4 status=$5 action=$6 WHERE id = $7;',
        values: [name, email, contact, address, status, actions, id]
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
    var buyer_query ={
        text: 'DELETE FROM buyerManagement WHERE id= $1',
        values: [id]
      }
      pool.query (buyer_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var buyer_query ={
        text: 'SELECT *  FROM buyerManagement',
      }
      pool.query (buyer_query,(err,req)=>{
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
    var buyer_query ={
        text: 'SELECT *  FROM buyerManagement WHERE id = $1',
        values: [id]
      }
      pool.query (buyer_query,(err,req)=>{
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