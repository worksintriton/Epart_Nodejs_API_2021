var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var reason = req.body.name;
    var status = req.body.status;
    var reason_query ={
        text: 'INSERT INTO reason (name,status) VALUES ($1,$2);',
        values: [reason, status]
      }
      pool.query (reason_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
    var reason = req.body.name;
    var status = req.body.status;
    var id = req.params.id;
    var reason_query ={
        text: 'UPDATE reason SET name=$1 status=$2  WHERE id = $3;',
        values: [reason, status, id]
      }
      pool.query (reason_query,(err,req)=>{
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
    var reason_query ={
        text: 'DELETE FROM reason WHERE id= $1',
        values: [id]
      }
      pool.query (reason_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var reason_query ={
        text: 'SELECT *  FROM reason',
      }
      pool.query (reason_query,(err,req)=>{
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
    var reason_query ={
        text: 'SELECT *  FROM reason WHERE id = $1',
        values: [id]
      }
      pool.query (reason_query,(err,req)=>{
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