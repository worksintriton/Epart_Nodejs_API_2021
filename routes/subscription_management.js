var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create', (req, res) => {
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

  var planName = req.body.planName;
  var no_of_users = req.body.no_of_users;
  var days = req.body.days;
  var effectiveDate = req.body.effectiveDate;
  var status = req.body.status;
  var actions = req.body.action;

  var subscription_query = {
    text: 'INSERT INTO subscriptionmanagement (plan_name,no_of_users, days,effective_date,status,created_by, modified_by, created_at, modified_at,action) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
    values: [planName, no_of_users, days, effectiveDate, status, person_id, person_id, isoDateString, isoDateString, actions]
  }
  pool.query(subscription_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});
router.put('/update/:id', (req, res) => {
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

  var planName = req.body.planName;
  var no_of_users = req.body.no_of_users;
  var days = req.body.days;
  var effectiveDate = req.body.effectiveDate;
  var status = req.body.status;
  var actions = req.body.action;
  var id = req.params.id;

  var subscription_query = {
    text: 'UPDATE subscriptionmanaement SET plan_name=$1 no_of_users=$2 days=$3  effective_date=$4 status=$5 modified_by=$6 modified_at=$7 action=$8 WHERE id = $9;',
    values: [planName, no_of_users, days, effectiveDate, status, person_id, isoDateString, actions, id]
  }
  pool.query(subscription_query, (err, req) => {
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
  var subscription_query = {
    text: 'DELETE FROM subscriptionmanaement WHERE id= $1',
    values: [id]
  }
  pool.query(subscription_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var subscription_query = {
    text: 'SELECT *  FROM subscriptionmanaement',
  }
  pool.query(subscription_query, (err, req) => {
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
  var subscription_query = {
    text: 'SELECT *  FROM subscriptionmanaement WHERE id = $1',
    values: [id]
  }
  pool.query(subscription_query, (err, req) => {
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