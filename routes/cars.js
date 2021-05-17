var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create', (req, res) => {
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

  var ERP_id = req.body.ERP_id;
  var brandName = req.body.brandName;
  var modelName = req.body.modelName;
  var parameterField = req.body.field;
  var parameterValue = req.body.value;
  var actions = req.body.action;


  var cars_query = {
    text: 'INSERT INTO cars (ERP_id, brandName, modelName, parameterfield, parametervaluestatus,created_by, modified_by, created_at, modified_at,action) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);',
    values: [ERP_id, brandName, modelName, parameterField, parameterValue, status, person_id, person_id, isoDateString, isoDateString, actions]
  }
  pool.query(cars_query, (err, req) => {
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

  var ERP_id = req.body.ERP_id;
  var brandName = req.body.brandName;
  var modelName = req.body.modelName;
  var parameterField = req.body.field;
  var parameterValue = req.body.value;
  var status = req.body.status;
  var actions = req.body.action;
  var id = req.params.id;

  var cars_query = {
    text: 'UPDATE cars SET ERP_id=$1 brandName=$2 modelName=$3 parameterfield=$4 parametervalue=$5 status=$6 modified_by=$7 modified_at=$8 action=$9 WHERE id = $10;',
    values: [ERP_id, brandName, modelName, parameterField, parameterValue, status, person_id, isoDateString, actions, id]
  }
  pool.query(cars_query, (err, req) => {
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
  var cars_query = {
    text: 'DELETE FROM cars WHERE id= $1',
    values: [id]
  }
  pool.query(cars_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});
router.get('/getlist', (req, res) => {
  var cars_query = {
    text: 'SELECT *  FROM cars',
  }
  pool.query(cars_query, (err, req) => {
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
  var cars_query = {
    text: 'SELECT *  FROM cars WHERE id = $1',
    values: [id]
  }
  pool.query(cars_query, (err, req) => {
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