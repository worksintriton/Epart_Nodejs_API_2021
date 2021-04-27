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
    
});
router.delete('/delete/:id',(req,res)=>{
    
});
router.get('/getlist',(req,res)=>{
    
});
router.get('/getby_id',(req,res)=>{
    
});

module.exports = router;