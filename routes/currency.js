var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var currency = req.body.name;
    var currency_query ={
        text: 'INSERT INTO currency (name) VALUES ($1);',
        values: [currency]
      }
      pool.query (currency_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
    var currency = req.body.name;
    var id = req.params.id;
    var currency_query ={
        text: 'UPDATE currency SET name=$1  WHERE id = $2;',
        values: [currency, id]
      }
      pool.query (currency_query,(err,req)=>{
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
    var currency_query ={
        text: 'DELETE FROM currency WHERE id= $1',
        values: [id]
      }
      pool.query (currency_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var currency_query ={
        text: 'SELECT *  FROM currency',
      }
      pool.query (currency_query,(err,req)=>{
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
    var currency_query ={
        text: 'SELECT *  FROM currency WHERE id = $1',
        values: [id]
      }
      pool.query (currency_query,(err,req)=>{
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