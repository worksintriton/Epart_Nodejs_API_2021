var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{

    var name = req.body.name;
    var userType = req.body.userType;
    var reg_status = req.body.reg_status;
    var email = req.body.email;
    var actions = req.body.action;

    var newsletter_query ={
        text: 'INSERT INTO newslettermanagement (name,user_type,reg_status, email, action) VALUES ($1,$2,$3,$4,$5);',
        values: [name, userType, reg_status, email, actions]
      }
      pool.query (newsletter_query,(err,req)=>{
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
    
  var newsletter_query ={
        text: 'UPDATE newslettermanagement SET name=$1 user_type=$2 reg_status=$3 email=$4 action=$5 WHERE id = $6;',
        values: [name, userType, reg_status, email, actions, id]
      }
      pool.query (newsletter_query,(err,req)=>{
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
    var newsletter_query ={
        text: 'DELETE FROM newslettermanagement WHERE id= $1',
        values: [id]
      }
      pool.query (newsletter_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var newsletter_query ={
        text: 'SELECT *  FROM newslettermanagement',
      }
      pool.query (newsletter_query,(err,req)=>{
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
    var newsletter_query ={
        text: 'SELECT *  FROM newslettermanagement WHERE id = $1',
        values: [id]
      }
      pool.query (newsletter_query,(err,req)=>{
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