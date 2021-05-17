var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create', (req, res) => {
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

  var productType = req.body.productType;
  var commissionPercent = req.body.commissionPercent;
  var effectiveDate = req.body.effectiveDate;
  var status = req.body.status;

  var commision_query = {
    text: 'INSERT INTO commissionmanagement (product_type,commission_percent,effective_date,created_by, modified_by, created_at, modified_at,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);',
    values: [productType, commissionPercent, effectiveDate, person_id, person_id, isoDateString, isoDateString, status]
  }
  pool.query(commision_query, (err, req) => {
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

  var productType = req.body.productType;
  var commissionPercent = req.body.commissionPercent;
  var effectiveDate = req.body.effectiveDate;
  var status = req.body.status;
  var id = req.params.id;

  var commision_query = {
    text: 'UPDATE commissionmanagement SET productType=$1 commissionPercent=$2 effectiveDate=$3 modified_by=$4 modified_at=$5 status=$6 WHERE id = $7;',
    values: [productType, commissionPercent, effectiveDate, person_id, isoDateString, status, id]
  }
  pool.query(commision_query, (err, req) => {
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
  var commision_query = {
    text: 'DELETE FROM commissionmanagement WHERE id= $1',
    values: [id]
  }
  pool.query(commision_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var commision_query = {
    text: 'SELECT *  FROM commissionmanagement',
  }
  pool.query(commision_query, (err, req) => {
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
  var commision_query = {
    text: 'SELECT *  FROM commissionmanagement WHERE id = $1',
    values: [id]
  }
  pool.query(commision_query, (err, req) => {
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