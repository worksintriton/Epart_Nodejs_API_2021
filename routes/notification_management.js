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

    var name = req.body.name;
    var actions = req.body.actions;
    
    var notification_query ={
        text: 'INSERT INTO notificationmanagement (name, created_by, modified_by, created_at, modified_at, actions) VALUES ($1,$2,$3,$4,$5,$6);',
        values: [name, person_id, person_id, isoDateString, isoDateString, actions]
      }
      pool.query (notification_query,(err,req)=>{
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

  var name = req.body.name;
  var actions = req.body.action;
  var id = req.params.id;
  

  var notification_query ={
        text: 'UPDATE notificationmanagement SET name=$1 modified_by=$2 modified_at=$3 action=$4 WHERE id = $5;',
        values: [name, person_id, isoDateString, actions, id]
      }
      pool.query (notification_query,(err,req)=>{
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
    var notification_query ={
        text: 'DELETE FROM notificationmanagement WHERE id= $1',
        values: [id]
      }
      pool.query (notification_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var notification_query ={
        text: 'SELECT *  FROM notificationmanagement',
      }
      pool.query (notification_query,(err,req)=>{
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
    var notification_query ={
        text: 'SELECT *  FROM notificationmanagement WHERE id = $1',
        values: [id]
      }
      pool.query (notification_query,(err,req)=>{
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