var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create', (req, res) => {
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);

  var name = req.body.name;
  var email = req.body.email;
  var contactNumber = req.body.number;
  var role = req.body.role;
  var status = req.body.status;
  var actions = req.body.action;
  var person_id = decoded.users.id;

  var intermediator_query = {
    text: 'INSERT INTO intermediatormanagement (name,email,contactNumber,role,created_by, modified_by, created_at, modified_at,status,action) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
    values: [name, email, contactNumber, role, person_id, person_id, isoDateString, isoDateString, status, actions]
  }
  pool.query(intermediator_query, (err, req) => {
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

  var name = req.body.name;
  var email = req.body.email;
  var contactNumber = req.body.number;
  var role = req.body.role;
  var status = req.body.status;
  var actions = req.body.action;
  var person_id = decoded.users.id;

  var id = req.params.id;
  var intermediator_query = {
    text: 'UPDATE intermediatormanagement SET name=$1 email=$2 contactNumber=$3 role=$4 modified_by=$5 modified_at=$6 status=$7 action=$8 WHERE id = $9;',
    values: [name, email, contactNumber, role, person_id, isoDateString, status, actions, id]
  }
  pool.query(intermediator_query, (err, req) => {
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
  var intermediator_query = {
    text: 'DELETE FROM intermediatormanagement WHERE id= $1',
    values: [id]
  }
  pool.query(intermediator_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var intermediator_query = {
    text: 'SELECT *  FROM intermediatormanagement',
  }
  pool.query(intermediator_query, (err, req) => {
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
  var intermediator_query = {
    text: 'SELECT *  FROM intermediatormanagement WHERE id = $1',
    values: [id]
  }
  pool.query(intermediator_query, (err, req) => {
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