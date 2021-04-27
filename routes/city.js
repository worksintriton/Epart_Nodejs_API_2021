var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var city = req.body.name;
    var city_query ={
        text: 'INSERT INTO city (name) VALUES ($1);',
        values: [city]
      }
      pool.query (city_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
    var city = req.body.name;
    var id = req.params.id;
    var city_query ={
        text: 'UPDATE city SET name=$1  WHERE id = $2;',
        values: [city, id]
      }
      pool.query (city_query,(err,req)=>{
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
    var city_query ={
        text: 'DELETE FROM city WHERE id= $1',
        values: [id]
      }
      pool.query (city_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var city_query ={
        text: 'SELECT *  FROM city',
      }
      pool.query (city_query,(err,req)=>{
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
    var city_query ={
        text: 'SELECT *  FROM city WHERE id = $1',
        values: [id]
      }
      pool.query (city_query,(err,req)=>{
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