var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create',(req,res)=>{
  console.log(req.headers.authorization);
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

    var moduleName = req.body.moduleName;
    var title = req.body.title;
    var actions = req.body.actions;
    
    var smsTemplate_query ={
        text: 'INSERT INTO smstemplate (module_name, title, actions, created_by, modified_by, created_at, modified_at) VALUES ($1,$2,$3,$4,$5,$6,$7);',
        values: [moduleName, title, actions, person_id, person_id, isoDateString, isoDateString]
      }
      pool.query (smsTemplate_query,(err,req)=>{
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

  var moduleName = req.body.moduleName;
  var title = req.body.title;
  var actions = req.body.actions;
  var id = req.params.id;
  

  var smsTemplate_query ={
        text: 'UPDATE smstemplate SET module_name=$1 title=$2 action=$3 modified_by=$4 modified_at=$5  WHERE id = $6;',
        values: [moduleName, title, actions, person_id, isoDateString, id]
      }
      pool.query (smsTemplate_query,(err,req)=>{
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
    var smsTemplate_query ={
        text: 'DELETE FROM smstemplate WHERE id= $1',
        values: [id]
      }
      pool.query (smsTemplate_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var smsTemplate_query ={
        text: 'SELECT *  FROM smstemplate',
      }
      pool.query (smsTemplate_query,(err,req)=>{
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
    var smsTemplate_query ={
        text: 'SELECT *  FROM smstemplate WHERE id = $1',
        values: [id]
      }
      pool.query (smsTemplate_query,(err,req)=>{
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