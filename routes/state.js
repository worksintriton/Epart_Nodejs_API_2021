var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create', (req, res) => {
  var state = req.body.state_name;
  var country = req.body.country_id;
  var created_at = new Date();
  var modified_at = new Date();
  var created_by = 1;
  var modified_by = 1;

  var state_query = {
    text: 'INSERT INTO state_details (state_name,country_id,created_at,modified_at,created_by,modified_by) VALUES ($1,$2,$3,$4,$5,$6);',
    values: [state, country, created_at, modified_at, created_by, modified_by]
  }
  pool.query(state_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [] });
    } else {
      res.json({ success: true, msg: "New State Created Successfully", data: req.rows });
    }
  });
});
router.put('/update/:id', (req, res) => {
  var state = req.body.state_name;
  var country = req.body.country_id;
  var created_at = req.body.created_at;
  var modified_at = new Date();
  var created_by = 1;
  var modified_by = 1;
  var id = req.params.id;
  var state_query = {
    text: 'UPDATE state_details SET state_name=$1, country_id=$2, created_at=$3, modified_at=$4 ,created_by=$5, modified_by=$6  WHERE id = $7;',
    values: [state, country, created_at, modified_at, created_by, modified_by, id]
  }
  pool.query(state_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [] });
    } else {
      res.json({ success: true, msg: "State Updated Successfully", data: req.rows });
    }
  })

});
router.delete('/delete/:id', (req, res) => {
  var id = req.params.id;
  var state_query = {
    text: 'DELETE FROM state_details WHERE id= $1',
    values: [id]
  }
  pool.query(state_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [] });
    } else {
      res.json({ success: true, msg: "State Deleted Successfully", data: req.rows });
    }
  })
});
router.get('/getlist', (req, res) => {
  var state_query = {
    text: 'SELECT *  FROM state_details',
  }
  pool.query(state_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [] });
    } else {
      res.json({ success: true, msg: "Loadind State", data: req.rows });
    }
  })

});
router.get('/getby_id/:id', (req, res) => {
  var id = req.params.id;
  var state_query = {
    text: 'SELECT *  FROM state_details WHERE id = $1',
    values: [id]
  }
  pool.query(state_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});

module.exports = router;