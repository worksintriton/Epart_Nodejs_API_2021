var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var contactNumber = req.body.number;
    var role = req.body.role;
    var status = req.body.status;
    var actions = req.body.action;
   

    var intermediator_query ={
        text: 'INSERT INTO intermediatorManagement (name,email,contactNumber,role,status,action) VALUES ($1,$2,$3,$4,$5,$6);',
        values: [name, email, contactNumber, role, status, actions]
      }
      pool.query (intermediator_query,(err,req)=>{
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
  var email = req.body.email;
  var contactNumber = req.body.number;
  var role = req.body.role;
  var status = req.body.status;
  var actions = req.body.action;
  
    var id = req.params.id;
    var intermediator_query ={
        text: 'UPDATE intermediatorManagement SET name=$1 email=$2 contactNumber=$3 role=$4  status=$5 action=$6 WHERE id = $7;',
        values: [name, email, contactNumber, role, status, actions, id]
      }
      pool.query (intermediator_query,(err,req)=>{
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
    var intermediator_query ={
        text: 'DELETE FROM intermediatorManagement WHERE id= $1',
        values: [id]
      }
      pool.query (intermediator_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var intermediator_query ={
        text: 'SELECT *  FROM intermediatorManagement',
      }
      pool.query (intermediator_query,(err,req)=>{
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
    var intermediator_query ={
        text: 'SELECT *  FROM intermediatorManagement WHERE id = $1',
        values: [id]
      }
      pool.query (intermediator_query,(err,req)=>{
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