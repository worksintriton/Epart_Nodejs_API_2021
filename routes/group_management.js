var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create', (req, res) => {

  var carId = req.body.carid;
  var brand = req.body.brand;
  var model = req.body.model;
  var groupCode = req.body.code;
  var groupName = req.body.name;
  var status = req.body.status;
  var actions = req.body.action;

  var group_query = {
    text: 'INSERT INTO groupmanagement (car_id,brand,model,groupcode, groupName,status,action) VALUES ($1,$2,$3,$4,$5,$6,$7);',
    values: [carId, brand, model, groupCode, groupName, status, actions]
  }
  pool.query(group_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});
router.put('/update/:id', (req, res) => {

  var carId = req.body.carid;
  var brand = req.body.brand;
  var model = req.body.model;
  var groupCode = req.body.code;
  var groupName = req.body.name;
  var status = req.body.status;
  var actions = req.body.action;

  var group_query = {
    text: 'UPDATE groupmanagement SET car_id=$1 brand=$2 model=$3 groupcode=$4 groupName=$5 status=$6 action=$7 WHERE id = $8;',
    values: [carId, brand, model, groupCode, groupName, status, actions, id]
  }
  pool.query(group_query, (err, req) => {
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
  var group_query = {
    text: 'DELETE FROM groupmanagement WHERE id= $1',
    values: [id]
  }
  pool.query(group_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var group_query = {
    text: 'SELECT *  FROM groupmanagement',
  }
  pool.query(group_query, (err, req) => {
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
  var group_query = {
    text: 'SELECT *  FROM groupmanagement WHERE id = $1',
    values: [id]
  }
  pool.query(group_query, (err, req) => {
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