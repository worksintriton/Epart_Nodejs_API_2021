var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create',(req,res)=>{

    var buyerName = req.body.buyerName;
    var carId = req.body.carId;
    var brand = req.body.brand;
    var model = req.body.model;
    var VINnumber = req.body.VINnumber;

    var myCar_query ={
        text: 'INSERT INTO mycarmanagement (buyer_name,car_id,brand, model, vin_number) VALUES ($1,$2,$3,$4,$5);',
        values: [buyerName, carId, brand, model, VINnumber]
      }
      pool.query (myCar_query,(err,req)=>{
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
    var userType = req.body.userType;
    var reg_status = req.body.reg_status;
    var email = req.body.email;
    var actions = req.body.action;
    
  var myCar_query ={
        text: 'UPDATE mycarmanagement SET buyer_name=$1 car_id=$2 brand=$3 model=$4 vin_number=$5 WHERE id = $6;',
        values: [buyerName, carId, brand, model, VINnumber, id]
      }
      pool.query (myCar_query,(err,req)=>{
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
    var myCar_query ={
        text: 'DELETE FROM mycarmanagement WHERE id= $1',
        values: [id]
      }
      pool.query (myCar_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var myCar_query ={
        text: 'SELECT *  FROM mycarmanagement',
      }
      pool.query (myCar_query,(err,req)=>{
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
    var myCar_query ={
        text: 'SELECT *  FROM mycarmanagement WHERE id = $1',
        values: [id]
      }
      pool.query (myCar_query,(err,req)=>{
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