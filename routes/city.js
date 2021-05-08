var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var city = req.body.city_name;
    var state = req.body.state_id;
    var country = req.body.country_id;
    var created_at = new Date();
    var modified_at = new Date();
    var created_by = 1;
    var modified_by = 1;
    var city_query ={
        text: 'INSERT INTO city_details (city_name, state_id, country_id,created_at,modified_at,created_by,modified_by) VALUES ($1,$2,$3,$4,$5,$6,$7);',
        values: [city, state, country, created_at, modified_at, created_by, modified_by]
      }
      pool.query (city_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database", data:[]});
        } else {
          res.json({success: true, msg:"New City Created Successfully", data:req.rows});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
  var city = req.body.city_name;
  var state = req.body.state_id;
  var country = req.body.country_id;
  var created_at = req.body.created_at;
  var modified_at = new Date();
  var created_by = 1;
  var modified_by = 1;
    var id = req.params.id;
    var city_query ={
        text: 'UPDATE city_details SET city_name=$1, state_id=$2, country_id=$3, created_at=$4, modified_at=$5 ,created_by=$6, modified_by=$7  WHERE id = $8;',
        values: [city, state, country,created_at,modified_at,created_by,modified_by,id]
      }
      pool.query (city_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database", data:[] });
        } else {
          res.json({success: true, msg:"City Updated Successfully", data:req.rows});
        }
      })  
    
});
router.delete('/delete/:id',(req,res)=>{
    var id = req.params.id;
    var city_query ={
        text: 'DELETE FROM city_details WHERE id= $1',
        values: [id]
      }
      pool.query (city_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database", data:[] });
        } else {
          res.json({success: true, msg:"City Deleted Successfully", data:req.rows});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var city_query ={
        text: 'SELECT *  FROM city_details',
      }
      pool.query (city_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database", data:[] });
        } else {
          res.json({success: true, msg:"Loading Cities", data:req.rows});
        }
      });  
});
router.get('/getby_id/:id',(req,res)=>{
    var id = req.params.id;
    var city_query ={
        text: 'SELECT *  FROM city_details WHERE id = $1',
        values: [id]
      }
      pool.query (city_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database", data:[] });
        } else {
          console.log(req)
          res.json({success: true, msg:"Loading Cities", data:req.rows});
        }
      })  
});

module.exports = router;