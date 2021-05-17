var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create', (req, res) => {
  console.log(req.headers.authorization);
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);

  var name = req.body.name;
  var email = req.body.email;
  var contact = req.body.number;
  var address = req.body.address;
  var status = req.body.status;
  var actions = req.body.actions;
  var person_id = decoded.users.id;

  var buyer_query = {
    text: 'INSERT INTO buyermanagement (name,email,number,address, created_by, modified_by, created_at, modified_at, status,actions) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
    values: [name, email, contact, address, person_id, person_id, isoDateString, isoDateString, status, actions]
  }
  pool.query(buyer_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully created" });
    }
  })
});
router.put('/update/:id', (req, res) => {
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);

  var name = req.body.name;
  var email = req.body.email;
  var contact = req.body.number;
  var address = req.body.address;
  var status = req.body.status;
  var actions = req.body.action;
  var id = req.params.id;
  var person_id = decoded.users.id;

  var buyer_query = {
    text: 'UPDATE buyerManagement SET name=$1 email=$2 number=$3 address=$4 modified_by=$5 modified_at=$6 status=$7 action=$8 WHERE id = $9;',
    values: [name, email, contact, address, person_id, isoDateString, status, actions, id]
  }
  pool.query(buyer_query, (err, req) => {
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
  var buyer_query = {
    text: 'DELETE FROM buyerManagement WHERE id= $1',
    values: [id]
  }
  pool.query(buyer_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var buyer_query = {
    text: 'SELECT *  FROM buyerManagement',
  }
  pool.query(buyer_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })

});
router.get('/getby_id/:id', (req, res) => {
  var id = req.params.id;
  var buyer_query = {
    text: 'SELECT *  FROM buyerManagement WHERE id = $1',
    values: [id]
  }
  pool.query(buyer_query, (err, req) => {
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