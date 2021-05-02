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

    var moduleName = req.body.moduleName;
    var title = req.body.title;
    var emailType = req.body.emailType;
    var encodingType = req.body.encodingType;
    var iso_8859_1 = req.body.iso_8859_1;
    var description = req.body.description;
    var subject = req.body.subject;
    var emailContent = req.body.emailContent;
    var attachment = req.body.attachment;
    var actions = req.body.actions;
    
    var emailTemplate_query ={
        text: 'INSERT INTO emailtemplate (module_name, title, email_type, encoding_type, iso_8859_1, description, subject, email_content, attachment, created_by, modified_by, created_at, modified_at, actions) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);',
        values: [moduleName, title, emailType, encodingType, iso_8859_1, description, subject, emailContent, attachment, person_id, person_id, isoDateString, isoDateString, actions]
      }
      pool.query (emailTemplate_query,(err,req)=>{
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

  var moduleName = req.body.moduleName;
  var title = req.body.title;
  var emailType = req.body.emailType;
  var encodingType = req.body.encodingType;
  var iso_8859_1 = req.body.iso_8859_1;
  var description = req.body.description;
  var subject = req.body.subject;
  var emailContent = req.body.emailContent;
  var attachment = req.body.attachment;
  var actions = req.body.actions;
  var id = req.params.id;
  

  var emailTemplate_query ={
        text: 'UPDATE emailtemplate SET module_name=$1 title=$2 email_type=$3 encoding_type=$4 iso_8859_1=$5 description=$6 subject=$7 email_content=$8 attachment=$9 modified_by=$10 modified_at=$11 action=$12 WHERE id = $13;',
        values: [moduleName, title, emailType, encodingType, iso_8859_1, description, subject, emailContent, attachment, person_id, isoDateString, actions, id]
      }
      pool.query (emailTemplate_query,(err,req)=>{
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
    var emailTemplate_query ={
        text: 'DELETE FROM emailtemplate WHERE id= $1',
        values: [id]
      }
      pool.query (emailTemplate_query,(err,req)=>{
        if (err) {
          console.log(err.stack);
          res.json({ success: false, msg: "Error in database" });
        } else {
          res.json({success: true, msg:"succesfully deleted"});
        }
      })  
});
router.get('/getlist',(req,res)=>{
    var emailTemplate_query ={
        text: 'SELECT *  FROM emailtemplate',
      }
      pool.query (emailTemplate_query,(err,req)=>{
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
    var emailTemplate_query ={
        text: 'SELECT *  FROM emailtemplate WHERE id = $1',
        values: [id]
      }
      pool.query (emailTemplate_query,(err,req)=>{
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