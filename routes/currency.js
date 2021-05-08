var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var currency = req.body.currency_name;
    var created_at = new Date();
    var modified_at = new Date();
    var created_by = 1;
    var modified_by = 1;
    var currency_query ={
        text: 'INSERT INTO currency_details (currency_name,created_at,modified_at,created_by,modified_by) VALUES ($1,$2,$3,$4,$5);',
        values: [currency,created_at,modified_at,created_by,modified_by]
      }
      pool.query (currency_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database",data:[] });
        } else {
          res.json({success: true, msg:"New Currency Created Successfully", data:req.rows});
        }
      });  
});

router.put('/update/:id',(req,res)=>{
    var currency = req.body.currency_name;
    var created_at = req.body.created_at;
    var modified_at = new Date();
    var created_by = 1;
    var modified_by = 1;
    var id = req.params.id;
    var currency_query ={
        text: 'UPDATE currency_details SET currency_name=$1, created_at=$2, modified_at=$3 ,created_by=$4, modified_by=$5  WHERE id = $6;',
        values: [currency,created_at,modified_at,created_by,modified_by, id]
      }
      pool.query (currency_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database", data:[] });
        } else {
          res.json({success: true, msg:"Currency Updated Successfully", data:req.rows});
        }
      });
});

router.delete('/delete/:id',(req,res)=>{
    var id = req.params.id;
    var currency_query ={
        text: 'DELETE FROM currency_details WHERE id= $1',
        values: [id]
      }
      pool.query (currency_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database", data:[] });
        } else {
          res.json({success: true, msg:"Currency Deleted Successfully", data:req.rows});
        }
      });  
});

router.get('/getlist',(req,res)=>{
    var currency_query ={
        text: 'SELECT *  FROM currency_details',
      }
      pool.query (currency_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database", data:[] });
        } else {
          res.json({success: true, msg:"Loading Currencies", data:req.rows});
        }
      });
});

router.get('/getby_id/:id',(req,res)=>{
    var id = req.params.id;
    var currency_query ={
        text: 'SELECT *  FROM currency_details WHERE id = $1',
        values: [id]
      }
      pool.query (currency_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database", data:[] });
        } else {
          console.log(req)
          res.json({success: true, msg:"Loading Currencies", data:req.rows});
        }
      }); 
});

module.exports = router;