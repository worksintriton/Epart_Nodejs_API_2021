var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create', (req, res) => {
  console.log(req.headers.authorization);
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

  var slotName = req.body.slotName;
  var firstConfirmedOrderDate = req.body.firstConfirmedOrderDate;
  var noOfDays = req.body.noOfDays;
  var description = req.body.description;
  var actions = req.body.actions;

  var payoutSchedule_query = {
    text: 'INSERT INTO payoutschedulemanagement (slot_name, first_confirmed_order_date, no_of_days, description, created_by, modified_by, created_at, modified_at, actions) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);',
    values: [slotName, firstConfirmedOrderDate, noOfDays, description, person_id, person_id, isoDateString, isoDateString, actions]
  }
  pool.query(payoutSchedule_query, (err, req) => {
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

  var slotName = req.body.slotName;
  var firstConfirmedOrderDate = req.body.firstConfirmedOrderDate;
  var noOfDays = req.body.noOfDays;
  var description = req.body.description;
  var actions = req.body.actions;
  var id = req.params.id;


  var payoutSchedule_query = {
    text: 'UPDATE payoutschedulemanagement SET slot_name=$1 first_confirmed_order_date=$2 no_of_days=$3 description=$4 modified_by=$5 modified_at=$6 action=$7 WHERE id = $8;',
    values: [slotName, firstConfirmedOrderDate, noOfDays, description, person_id, isoDateString, actions, id]
  }
  pool.query(payoutSchedule_query, (err, req) => {
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
  var payoutSchedule_query = {
    text: 'DELETE FROM payoutschedulemanagement WHERE id= $1',
    values: [id]
  }
  pool.query(payoutSchedule_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var payoutSchedule_query = {
    text: 'SELECT *  FROM payoutschedulemanagement',
  }
  pool.query(payoutSchedule_query, (err, req) => {
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
  var payoutSchedule_query = {
    text: 'SELECT *  FROM payoutschedulemanagement WHERE id = $1',
    values: [id]
  }
  pool.query(payoutSchedule_query, (err, req) => {
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