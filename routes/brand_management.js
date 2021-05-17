var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create', (req, res) => {
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);

  var name = req.body.name;
  var ERP_id = req.body.ERP_id;
  var API_id = req.body.API_id;
  var status = req.body.status;
  var actions = req.body.action;
  var person_id = decoded.users.id;

  var brand_query = {
    text: 'INSERT INTO brandManagement (name,ERP_id,API_id,status,created_by, modified_by, created_at, modified_at,action) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);',
    values: [name, ERP_id, API_id, status, person_id, person_id, isoDateString, isoDateString, actions]
  }
  pool.query(brand_query, (err, req) => {
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
  var person_id = decoded.users.id;

  var name = req.body.name;
  var ERP_id = req.body.ERP_id;
  var API_id = req.body.API_id;
  var status = req.body.status;
  var actions = req.body.action;
  var id = req.params.id;

  var brand_query = {
    text: 'UPDATE brandManagement SET name=$1 ERP_id=$2 API_id=$3 status=$4 modified_by=$5 modified_at=$6 action=$7 WHERE id = $8;',
    values: [name, ERP_id, API_id, status, person_id, isoDateString, actions, id]
  }
  pool.query(brand_query, (err, req) => {
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
  var brand_query = {
    text: 'DELETE FROM brandManagement WHERE id= $1',
    values: [id]
  }
  pool.query(brand_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});
router.get('/getlist', (req, res) => {
  var brand_query = {
    text: 'SELECT *  FROM brandManagement',
  }
  pool.query(brand_query, (err, req) => {
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
  var brand_query = {
    text: 'SELECT *  FROM brandManagement WHERE id = $1',
    values: [id]
  }
  pool.query(brand_query, (err, req) => {
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