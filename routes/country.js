var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var country = req.body.country_name;
    var created_at = new Date();
    var modified_at = new Date();
    var created_by = 1;
    var modified_by = 1;
    var country_query ={
        text: 'INSERT INTO country_details (country_name,created_at,modified_at,created_by,modified_by) VALUES ($1,$2,$3,$4,$5);',
        values: [country,created_at,modified_at,created_by,modified_by]
      }
      pool.query (country_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database", data:[]});
        } else {
          res.json({success: true, msg:"New Country Created Successfully", data:req.rows});
        }
      });  
});

router.put('/update/:id',(req,res)=>{
    var country = req.body.country_name;
    var created_at = req.body.created_at;
    var modified_at = new Date();
    var created_by = 1;
    var modified_by = 1;
    var id = req.params.id;
    var country_query ={
        text: 'UPDATE country_details SET country_name=$1, created_at=$2, modified_at=$3 ,created_by=$4, modified_by=$5  WHERE id = $6;',
        values: [country,created_at,modified_at,created_by,modified_by,id]
      }
      pool.query (country_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"Country Updated Successfully", data:req.rows});
        }
      });
});

router.delete('/delete/:id',(req,res)=>{
    var id = req.params.id;
    var country_query ={
        text: 'DELETE FROM country_details WHERE id= $1',
        values: [id]
      }
      pool.query (country_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"Country Deleted Successfully"});
        }
      });  
});


router.get('/getlist',(req,res)=>{
    var country_query ={
        text: 'SELECT *  FROM country_details',
      }
      pool.query (country_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:'Loading Countries', data:req.rows});
        }
      });
});

router.get('/getby_id/:id',(req,res)=>{
    var id = req.params.id;
    var country_query ={
        text: 'SELECT *  FROM country_details WHERE id = $1',
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
      }); 
});

module.exports = router;