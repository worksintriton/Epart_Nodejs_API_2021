var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create',(req,res)=>{
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

    var page_title = req.body.page_title;
    var status = req.body.status;
    var nonRegisterUser = req.body.nonRegisterUser;
    var actions = req.body.action;

    var staticPage_query ={
        text: 'INSERT INTO staticpages (page_title,status,non_register_user,created_by, modified_by, created_at, modified_at,action) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);',
        values: [page_title, status, nonRegisterUser, person_id, person_id, isoDateString, isoDateString, actions]
      }
      pool.query (staticPage_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully created"});
        }
      })  
});
router.put('/update/:id',(req,res)=>{
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

  var name = req.body.name;
  var ERP_id = req.body.ERP_id;
  var API_id = req.body.API_id;
  var status = req.body.status;
  var actions = req.body.action;
  var id = req.params.id;
    
  var staticPage_query ={
        text: 'UPDATE staticpages SET page_title=$1 status=$2 non_register_user=$3  modified_by=$4 modified_at=$5 action=$6 WHERE id = $7;',
        values: [page_title, status, nonRegisterUser, person_id, isoDateString, actions, id]
      }
      pool.query (staticPage_query,(err,req)=>{
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
    var staticPage_query ={
        text: 'DELETE FROM staticpages WHERE id= $1',
        values: [id]
      }
      pool.query (staticPage_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var staticPage_query ={
        text: 'SELECT *  FROM staticpages',
      }
      pool.query (staticPage_query,(err,req)=>{
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
    var staticPage_query ={
        text: 'SELECT *  FROM staticpages WHERE id = $1',
        values: [id]
      }
      pool.query (staticPage_query,(err,req)=>{
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