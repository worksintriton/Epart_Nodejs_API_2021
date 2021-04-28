var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{

    var categoryCode = req.body.categoryCode;
    var categoryName = req.body.categoryName;
    var description = req.body.description;
    var status = req.body.status;
    var actions = req.body.action;

    var categoryRequest_query ={
        text: 'INSERT INTO categoryrequestmanagement (category_code,category_name,description, status,action) VALUES ($1,$2,$3,$4,$5);',
        values: [categoryCode, categoryName, description, status, actions]
      }
      pool.query (categoryRequest_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
  
    var categoryCode = req.body.categoryCode;
    var categoryName = req.body.categoryName;
    var description = req.body.description;
    var status = req.body.status;
    var actions = req.body.action;
    
  var categoryRequest_query ={
        text: 'UPDATE categoryrequestmanagement SET category_code=$1 category_name=$2 description=$3 status=$4 action=$5 WHERE id = $6;',
        values: [categoryCode, categoryName, description, status, actions, id]
      }
      pool.query (categoryRequest_query,(err,req)=>{
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
    var categoryRequest_query ={
        text: 'DELETE FROM categoryrequestmanagement WHERE id= $1',
        values: [id]
      }
      pool.query (categoryRequest_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var categoryRequest_query ={
        text: 'SELECT *  FROM categoryrequestmanagement',
      }
      pool.query (categoryRequest_query,(err,req)=>{
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
    var categoryRequest_query ={
        text: 'SELECT *  FROM categoryrequestmanagement WHERE id = $1',
        values: [id]
      }
      pool.query (categoryRequest_query,(err,req)=>{
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