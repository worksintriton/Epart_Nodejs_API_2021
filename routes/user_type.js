var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var userType = req.body.name;
    var status = req.body.status;
    var userType_query ={
        text: 'INSERT INTO userType (name,status) VALUES ($1,$2);',
        values: [userType, status]
      }
      pool.query (userType_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
    var userType = req.body.name;
    var status = req.body.status;
    var id = req.params.id;
    var userType_query ={
        text: 'UPDATE userType SET name=$1 status=$2  WHERE id = $3;',
        values: [userType, status, id]
      }
      pool.query (userType_query,(err,req)=>{
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
    var userType_query ={
        text: 'DELETE FROM userType WHERE id= $1',
        values: [id]
      }
      pool.query (userType_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var userType_query ={
        text: 'SELECT *  FROM userType',
      }
      pool.query (userType_query,(err,req)=>{
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
    var userType_query ={
        text: 'SELECT *  FROM userType WHERE id = $1',
        values: [id]
      }
      pool.query (userType_query,(err,req)=>{
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