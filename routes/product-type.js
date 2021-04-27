var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{
    var product = req.body.type;
    var product_query ={
        text: 'INSERT INTO product_type (type) VALUES ($1);',
        values: [product]
      }
      pool.query (product_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
    var product = req.body.name;
    var id = req.params.id;
    var product_query ={
        text: 'UPDATE product_type SET type=$1  WHERE id = $2;',
        values: [product, id]
      }
      pool.query (product_query,(err,req)=>{
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
    var product_query ={
        text: 'DELETE FROM product_type WHERE id= $1',
        values: [id]
      }
      pool.query (product_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var product_query ={
        text: 'SELECT *  FROM product_type',
      }
      pool.query (product_query,(err,req)=>{
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
    var product_query ={
        text: 'SELECT *  FROM product_type WHERE id = $1',
        values: [id]
      }
      pool.query (product_query,(err,req)=>{
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