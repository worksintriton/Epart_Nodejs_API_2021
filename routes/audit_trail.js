var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create', (req, res) => {

  var moduleName = req.body.moduleName;
  var fieldName = req.body.fieldName;
  var values = req.body.values;
  var userName = req.body.userName;
  var timeStamp = req.body.timeStamp;
  var actions = req.body.action;

  var auditTrail_query = {
    text: 'INSERT INTO audit_trail (module_name,field_name,values, user_name, time_stamp, action) VALUES ($1,$2,$3,$4,$5,$6);',
    values: [moduleName, fieldName, values, userName, timeStamp, actions]
  }
  pool.query(auditTrail_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully created" });
    }
  })
});
router.put('/update/:id', (req, res) => {

  var name = req.body.name;
  var userType = req.body.userType;
  var reg_status = req.body.reg_status;
  var email = req.body.email;
  var actions = req.body.action;

  var auditTrail_query = {
    text: 'UPDATE audit_trail SET module_name=$1 field_name=$2 values=$3 user_name=$4 time_stamp=$5 action=$6 WHERE id = $7;',
    values: [moduleName, fieldName, values, userName, timeStamp, actions, id]
  }
  pool.query(auditTrail_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })

});
router.delete('/delete/:id', (req, res) => {
  var id = req.params.id;
  var auditTrail_query = {
    text: 'DELETE FROM audit_trail WHERE id= $1',
    values: [id]
  }
  pool.query(auditTrail_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var auditTrail_query = {
    text: 'SELECT *  FROM audit_trail',
  }
  pool.query(auditTrail_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: req.rows });
    }
  })

});
router.get('/getby_id/:id', (req, res) => {
  var id = req.params.id;
  var auditTrail_query = {
    text: 'SELECT *  FROM audit_trail WHERE id = $1',
    values: [id]
  }
  pool.query(auditTrail_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      console.log(req)
      res.json({ success: true, msg: req.rows });
    }
  })
});

module.exports = router;