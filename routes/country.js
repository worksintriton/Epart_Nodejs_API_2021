var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var country = req.body.name;
    var country_query ={
        text: 'INSERT INTO country (name) VALUES ($1);',
        values: [country]
      }
      pool.query (country_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
    var country = req.body.name;
    var id = req.params.id;
    var country_query ={
        text: 'UPDATE country SET name=$1  WHERE id = $2;',
        values: [country, id]
      }
      pool.query (country_query,(err,req)=>{
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
    var country_query ={
        text: 'DELETE FROM country WHERE id= $1',
        values: [id]
      }
      pool.query (country_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var country_query ={
        text: 'SELECT *  FROM country',
      }
      pool.query (country_query,(err,req)=>{
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
    var country_query ={
        text: 'SELECT *  FROM country WHERE id = $1',
        values: [id]
      }
      pool.query (country_query,(err,req)=>{
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