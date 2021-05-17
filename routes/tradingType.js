var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create', (req, res) => {
  var tradingType = req.body.name;
  var tradingType_query = {
    text: 'INSERT INTO tradingType (name) VALUES ($1);',
    values: [tradingType]
  }
  pool.query(tradingType_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});
router.put('/update/:id', (req, res) => {
  var tradingType = req.body.name;
  var id = req.params.id;
  var tradingType_query = {
    text: 'UPDATE tradingType SET name=$1  WHERE id = $2;',
    values: [tradingType, id]
  }
  pool.query(tradingType_query, (err, req) => {
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
  var tradingType_query = {
    text: 'DELETE FROM tradingType WHERE id= $1',
    values: [id]
  }
  pool.query(tradingType_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var tradingType_query = {
    text: 'SELECT *  FROM tradingType',
  }
  pool.query(tradingType_query, (err, req) => {
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
  var tradingType_query = {
    text: 'SELECT *  FROM tradingType WHERE id = $1',
    values: [id]
  }
  pool.query(tradingType_query, (err, req) => {
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