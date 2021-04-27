var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var role = req.body.name;
    var role_query ={
        text: 'INSERT INTO role (name) VALUES ($1);',
        values: [role]
      }
      pool.query (role_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
    var role = req.body.name;
    var id = req.params.id;
    var role_query ={
        text: 'UPDATE role SET name=$1  WHERE id = $2;',
        values: [role, id]
      }
      pool.query (role_query,(err,req)=>{
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
    var role_query ={
        text: 'DELETE FROM role WHERE id= $1',
        values: [id]
      }
      pool.query (role_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var role_query ={
        text: 'SELECT *  FROM role',
      }
      pool.query (role_query,(err,req)=>{
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
    var role_query ={
        text: 'SELECT *  FROM role WHERE id = $1',
        values: [id]
      }
      pool.query (role_query,(err,req)=>{
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