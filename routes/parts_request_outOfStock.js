var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create', (req, res) => {

  var partsNumber = req.body.partsNumber;
  var partsName = req.body.partsName;
  var brand = req.body.brand;
  var model = req.body.model;
  var userType = req.body.userType;
  var name = req.body.name;
  var requestedDateTime = req.body.requestedDateTime;
  var updatedDateTime = req.body.updatedDateTime;
  var loginId = req.body.loginId;
  var status = req.body.status;
  var actions = req.body.action;

  var partsRequest_query = {
    text: 'INSERT INTO parts_request (parts_number,parts_name,brand,model,user_type,name, requested_date_time, updated_date_time,login_id,status, action) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);',
    values: [partsNumber, partsName, brand, model, userType, name, requestedDateTime, updatedDateTime, loginId, status, actions]
  }
  pool.query(partsRequest_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});
router.put('/update/:id', (req, res) => {

  var partsNumber = req.body.partsNumber;
  var partsName = req.body.partsName;
  var brand = req.body.brand;
  var model = req.body.model;
  var userType = req.body.userType;
  var name = req.body.name;
  var requestedDateTime = req.body.requestedDateTime;
  var updatedDateTime = req.body.updatedDateTime;
  var loginId = req.body.loginId;
  var status = req.body.status;
  var actions = req.body.action;

  var partsRequest_query = {
    text: 'UPDATE parts_request SET parts_number=$1 parts_name=$2 brand=$3 model=$4 user_type=$5 name=$6 requested_date_time=$7 updated_date_time=$8 login_id=$9 status=$10 action=$11 WHERE id = $12;',
    values: [partsNumber, partsName, brand, model, userType, name, requestedDateTime, updatedDateTime, loginId, status, actions, id]
  }
  pool.query(partsRequest_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully changed" });
    }
  })

});
router.delete('/delete/:id', (req, res) => {
  var id = req.params.id;
  var partsRequest_query = {
    text: 'DELETE FROM parts_request WHERE id= $1',
    values: [id]
  }
  pool.query(partsRequest_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var partsRequest_query = {
    text: 'SELECT *  FROM parts_request',
  }
  pool.query(partsRequest_query, (err, req) => {
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
  var partsRequest_query = {
    text: 'SELECT *  FROM parts_request WHERE id = $1',
    values: [id]
  }
  pool.query(partsRequest_query, (err, req) => {
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