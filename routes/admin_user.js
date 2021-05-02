var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{

    var email = req.body.email;
    var password = req.body.password;
    var designation = req.body.designation;
    var contact = req.body.contact;
    var employeeId = req.body.employeeId;

    var adminUser_query ={
        text: 'INSERT INTO admin_user (email,password,designation, contact, employeeId) VALUES ($1,$2,$3,$4,$5);',
        values: [email, password, designation, contact, employeeId]
      }
      pool.query (adminUser_query,(err,req)=>{
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
    var userType = req.body.userType;
    var reg_status = req.body.reg_status;
    var email = req.body.email;
    var actions = req.body.action;
    
  var adminUser_query ={
        text: 'UPDATE admin_user SET email=$1 password=$2 designation=$3 contact=$4 employeeId=$5 WHERE id = $6;',
        values: [email, password, designation, contact, employeeId, id]
      }
      pool.query (adminUser_query,(err,req)=>{
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
    var adminUser_query ={
        text: 'DELETE FROM admin_user WHERE id= $1',
        values: [id]
      }
      pool.query (adminUser_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var adminUser_query ={
        text: 'SELECT *  FROM admin_user',
      }
      pool.query (adminUser_query,(err,req)=>{
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
    var adminUser_query ={
        text: 'SELECT *  FROM admin_user WHERE id = $1',
        values: [id]
      }
      pool.query (adminUser_query,(err,req)=>{
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