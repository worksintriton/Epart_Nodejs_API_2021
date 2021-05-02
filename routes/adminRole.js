var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{

    var name = req.body.name;
    var access = req.body.access;

    var adminRole_query ={
        text: 'INSERT INTO admin_role (name, access) VALUES ($1,$2);',
        values: [name, access]
      }
      pool.query (adminRole_query,(err,req)=>{
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
    var access = req.body.access;
    
  var adminRole_query ={
        text: 'UPDATE admin_role SET name=$1 access=$2 WHERE id = $3;',
        values: [name, access, id]
      }
      pool.query (adminRole_query,(err,req)=>{
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
    var adminRole_query ={
        text: 'DELETE FROM admin_role WHERE id= $1',
        values: [id]
      }
      pool.query (adminRole_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var adminRole_query ={
        text: 'SELECT *  FROM admin_role',
      }
      pool.query (adminRole_query,(err,req)=>{
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
    var adminRole_query ={
        text: 'SELECT *  FROM admin_role WHERE id = $1',
        values: [id]
      }
      pool.query (adminRole_query,(err,req)=>{
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