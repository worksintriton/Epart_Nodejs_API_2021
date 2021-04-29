var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create',(req,res)=>{
  console.log(req.headers.authorization);
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

    var name = req.body.name;
    var ratings = req.body.ratings;
    var reviews = req.body.reviews;
    var actions = req.body.actions;
    
    var ratingReview_query ={
        text: 'INSERT INTO ratingsreviews (name, ratings, reviews, created_by, modified_by, created_at, modified_at, actions) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);',
        values: [name, ratings, reviews, person_id, person_id, isoDateString, isoDateString, actions]
      }
      pool.query (ratingReview_query,(err,req)=>{
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
    var ratings = req.body.ratings;
    var reviews = req.body.reviews;
    var actions = req.body.actions;
    var id = req.params.id;
  

  var ratingReview_query ={
        text: 'UPDATE ratingsreviews SET name=$1 ratings=$2 reviews=$3 modified_by=$4 modified_at=$5 action=$6 WHERE id = $7;',
        values: [name, ratings, reviews, person_id, isoDateString, actions, id]
      }
      pool.query (ratingReview_query,(err,req)=>{
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
    var ratingReview_query ={
        text: 'DELETE FROM ratingsreviews WHERE id= $1',
        values: [id]
      }
      pool.query (ratingReview_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var ratingReview_query ={
        text: 'SELECT *  FROM ratingreview',
      }
      pool.query (ratingReview_query,(err,req)=>{
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
    var ratingReview_query ={
        text: 'SELECT *  FROM ratingreview WHERE id = $1',
        values: [id]
      }
      pool.query (ratingReview_query,(err,req)=>{
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