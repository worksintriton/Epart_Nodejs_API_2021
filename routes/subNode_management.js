var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{

    var carId = req.body.carid;
    var brand = req.body.brand;
    var model = req.body.model;
    var subnode_code = req.body.code;
    var subnode_name = req.body.name;
    var status = req.body.status;
    var actions = req.body.action;

    var subNode_query ={
        text: 'INSERT INTO subnodemanagement (car_id,brand,model, subnode_name, subnode_name, status,action) VALUES ($1,$2,$3,$4,$5,$6,$7);',
        values: [carId, brand, model, subnode_code, subnode_name, status, actions]
      }
      pool.query (subNode_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
  
    var carId = req.body.carid;
    var brand = req.body.brand;
    var model = req.body.model;
    var subnode_code = req.body.code;
    var subnode_name = req.body.name;
    var status = req.body.status;
    var actions = req.body.action;
    
  var subNode_query ={
        text: 'UPDATE subnodemanagement SET car_id=$1 brand=$2 model=$3 subnode_code=$4 subnode_name=$5 status=$6 action=$7 WHERE id = $8;',
        values: [carId, brand, model, subnode_code, subnode_name, status, actions, id]
      }
      pool.query (subNode_query,(err,req)=>{
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
    var subNode_query ={
        text: 'DELETE FROM subnodemanagement WHERE id= $1',
        values: [id]
      }
      pool.query (subNode_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var subNode_query ={
        text: 'SELECT *  FROM subnodemanagement',
      }
      pool.query (subNode_query,(err,req)=>{
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
    var subNode_query ={
        text: 'SELECT *  FROM subnodemanagement WHERE id = $1',
        values: [id]
      }
      pool.query (subNode_query,(err,req)=>{
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