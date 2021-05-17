var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create', (req, res) => {
  var reason_name = req.body.reason_name;
  var created_at = new Date();
  var modified_at = new Date();
  var created_by = 1;
  var modified_by = 1;
  var reason_query = {
    text: 'INSERT INTO reason_details (reason_name,created_at,modified_at,created_by,modified_by) VALUES ($1,$2,$3,$4,$5);',
    values: [reason_name, created_at, modified_at, created_by, modified_by]
  }
  pool.query(reason_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});
router.put('/update/:id', (req, res) => {
  var reason_name = req.body.reason_name;
  var created_at = req.body.created_at;
  var modified_at = new Date();
  var created_by = 1;
  var modified_by = 1;
  var id = req.params.id;
  var reason_query = {
    text: 'UPDATE reason_details SET reason_name=$1, created_at=$2, modified_at=$3 ,created_by=$4, modified_by=$5  WHERE id = $6;',
    values: [reason_name, created_at, modified_at, created_by, modified_by, id]
  }
  pool.query(reason_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [] });
    } else {
      res.json({ success: true, msg: "Reason Updated Successfully", data: req.rows });
    }
  })

});
router.delete('/delete/:id', (req, res) => {
  var id = req.params.id;
  var reason_query = {
    text: 'DELETE FROM reason_details WHERE id= $1',
    values: [id]
  }
  pool.query(reason_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [] });
    } else {
      res.json({ success: true, msg: "Reason Deleted Successfully", data: req.rows });
    }
  })
});
router.get('/getlist', (req, res) => {
  var reason_query = {
    text: 'SELECT * FROM reason_details',
  }
  pool.query(reason_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [] });
    } else {
      res.json({ success: true, msg: "Loading Currencies", data: req.rows });
    }
  })

});
router.get('/getby_id/:id', (req, res) => {
  var id = req.params.id;
  var reason_query = {
    text: 'SELECT *  FROM reason_details WHERE id = $1',
    values: [id]
  }
  pool.query(reason_query, (err, req) => {
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