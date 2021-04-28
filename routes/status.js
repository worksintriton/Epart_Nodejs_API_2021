var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var name = req.body.status;
    var status_query ={
        text: 'INSERT INTO status (status) VALUES ($1);',
        values: [name]
      }
      pool.query (status_query,(err,req)=>{
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
  var id = req.params.id;
  var status_query ={
      text: 'UPDATE status SET name=$1  WHERE id = $2;',
      values: [name, id]
    }
    pool.query (status_query,(err,req)=>{
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
    var status_query ={
        text: 'DELETE FROM status WHERE id= $1',
        values: [id]
      }
      pool.query (status_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
    
});
router.get('/getlist',(req,res)=>{
  var status_query ={
    text: 'SELECT *  FROM status',
  }
  pool.query (status_query,(err,req)=>{
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
  var status_query ={
      text: 'SELECT *  FROM status WHERE id = $1',
      values: [id]
    }
    pool.query (status_query,(err,req)=>{
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