var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var state = req.body.name;
    var state_query ={
        text: 'INSERT INTO state (name) VALUES ($1);',
        values: [state]
      }
      pool.query (state_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
    var state = req.body.name;
    var id = req.params.id;
    var state_query ={
        text: 'UPDATE state SET name=$1  WHERE id = $2;',
        values: [state, id]
      }
      pool.query (state_query,(err,req)=>{
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
    var state_query ={
        text: 'DELETE FROM state WHERE id= $1',
        values: [id]
      }
      pool.query (state_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var state_query ={
        text: 'SELECT *  FROM state',
      }
      pool.query (state_query,(err,req)=>{
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
    var state_query ={
        text: 'SELECT *  FROM state WHERE id = $1',
        values: [id]
      }
      pool.query (state_query,(err,req)=>{
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