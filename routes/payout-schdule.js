var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var payout = req.body.name;
    var payout_query ={
        text: 'INSERT INTO payout_schedule (name) VALUES ($1);',
        values: [payout]
      }
      pool.query (payout_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
    var payout = req.body.name;
    var id = req.params.id;
    var payout_query ={
        text: 'UPDATE payout_schedule SET name=$1  WHERE id = $2;',
        values: [payout, id]
      }
      pool.query (payout_query,(err,req)=>{
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
    var payout_query ={
        text: 'DELETE FROM payout_schedule WHERE id= $1',
        values: [id]
      }
      pool.query (payout_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var payout_query ={
        text: 'SELECT *  FROM payout_schedule',
      }
      pool.query (payout_query,(err,req)=>{
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
    var payout_query ={
        text: 'SELECT *  FROM payout_schedule WHERE id = $1',
        values: [id]
      }
      pool.query ( payout_query,(err,req)=>{
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