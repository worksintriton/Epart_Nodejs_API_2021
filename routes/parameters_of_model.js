var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create',(req,res)=>{
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

    var brandName = req.body.brandName;
    var modelName = req.body.modelName;
    var parameterNumber = req.body.parameterNumber;
    var status = req.body.status;
    var actions = req.body.action;
   

    var modelParameter_query ={
        text: 'INSERT INTO parameterModelManagement (brandName, modelName, parameterNumber,status,created_by, modified_by, created_at, modified_at,action) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);',
        values: [brandName, modelName, parameterNumber, status, person_id, person_id, isoDateString, isoDateString, actions]
      }
      pool.query (modelParameter_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

  var brandName = req.body.brandName;
  var modelName = req.body.modelName;
  var parameterNumber = req.body.parameterNumber;
  var status = req.body.status;
  var actions = req.body.action;
  var id = req.params.id;
    
  var modelParameter_query ={
        text: 'UPDATE parameterModelManagement SET brandName=$1 modelName=$2 parameterNumber=$3 status=$4 modified_by=$5 modified_at=$6 action=$7 WHERE id = $8;',
        values: [brandName, modelName, parameterNumber, status, person_id, isoDateString, actions, id]
      }
      pool.query (modelParameter_query,(err,req)=>{
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
    var modelParameter_query ={
        text: 'DELETE FROM parameterModelManagement WHERE id= $1',
        values: [id]
      }
      pool.query (modelParameter_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var modelParameter_query ={
        text: 'SELECT *  FROM parameterModelManagement',
      }
      pool.query (modelParameter_query,(err,req)=>{
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
    var modelParameter_query ={
        text: 'SELECT *  FROM parameterModelManagement WHERE id = $1',
        values: [id]
      }
      pool.query (modelParameter_query,(err,req)=>{
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