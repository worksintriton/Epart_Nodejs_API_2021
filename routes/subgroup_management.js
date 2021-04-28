var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{

    var carId = req.body.carid;
    var brand = req.body.brand;
    var model = req.body.model;
    var groupName = req.body.name;
    var subGroupName = req.body.subgroup_name;
    var status = req.body.status;
    var actions = req.body.action;

    var subgroup_query ={
        text: 'INSERT INTO subgroupmanagement (car_id,brand,model, groupname, subgroup_name, status,action) VALUES ($1,$2,$3,$4,$5,$6,$7);',
        values: [carId, brand, model, groupName, subGroupName, status, actions]
      }
      pool.query (subgroup_query,(err,req)=>{
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
    var groupName = req.body.name;
    var subGroupName = req.body.subgroup_name;
    var status = req.body.status;
    var actions = req.body.action;
    
  var subgroup_query ={
        text: 'UPDATE subgroupmanagement SET car_id=$1 brand=$2 model=$3 groupname=$4 subgroup_name=$5 status=$6 action=$7 WHERE id = $8;',
        values: [carId, brand, model, groupName, subGroupName, status, actions, id]
      }
      pool.query (subgroup_query,(err,req)=>{
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
    var subgroup_query ={
        text: 'DELETE FROM subgroupmanagement WHERE id= $1',
        values: [id]
      }
      pool.query (subgroup_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var subgroup_query ={
        text: 'SELECT *  FROM subgroupmanagement',
      }
      pool.query (subgroup_query,(err,req)=>{
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
    var subgroup_query ={
        text: 'SELECT *  FROM subgroupmanagement WHERE id = $1',
        values: [id]
      }
      pool.query (subgroup_query,(err,req)=>{
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