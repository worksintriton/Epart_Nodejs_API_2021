var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var name = req.body.name;
    var ERP_id = req.body.ERP_id;
    var API_id = req.body.API_id;
    var status = req.body.status;
    var actions = req.body.action;
   

    var brand_query ={
        text: 'INSERT INTO brandManagement (name,ERP_id,API_id,status,action) VALUES ($1,$2,$3,$4,$5);',
        values: [name, ERP_id, API_id, status, actions]
      }
      pool.query (brand_query,(err,req)=>{
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
  var ERP_id = req.body.ERP_id;
  var API_id = req.body.API_id;
  var status = req.body.status;
  var actions = req.body.action;
  var id = req.params.id;
    
  var brand_query ={
        text: 'UPDATE brandManagement SET name=$1 ERP_id=$2 API_id=$3 status=$4 action=$5 WHERE id = $6;',
        values: [name, ERP_id, API_id, status, actions, id]
      }
      pool.query (brand_query,(err,req)=>{
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
    var brand_query ={
        text: 'DELETE FROM brandManagement WHERE id= $1',
        values: [id]
      }
      pool.query (brand_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var brand_query ={
        text: 'SELECT *  FROM brandManagement',
      }
      pool.query (brand_query,(err,req)=>{
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
    var brand_query ={
        text: 'SELECT *  FROM brandManagement WHERE id = $1',
        values: [id]
      }
      pool.query (brand_query,(err,req)=>{
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