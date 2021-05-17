var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create', (req, res) => {

  var date = req.body.date;
  var number = req.body.number;
  var details = req.body.details;
  var type = req.body.type;
  var amount = req.body.amount;
  var status = req.body.status;
  var actions = req.body.action;

  var order_query = {
    text: 'INSERT INTO ordersmanagement (date,number,details, type, amount, status,action) VALUES ($1,$2,$3,$4,$5,$6,$7);',
    values: [date, number, details, type, amount, status, actions]
  }
  pool.query(order_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully created" });
    }
  })
});
router.put('/update/:id', (req, res) => {

  var date = req.body.date;
  var number = req.body.number;
  var details = req.body.details;
  var type = req.body.type;
  var amount = req.body.amount;
  var status = req.body.status;
  var actions = req.body.action;

  var order_query = {
    text: 'UPDATE ordersmanagement SET date=$1 number=$2 details=$3 type=$4 amount=$5 status=$6 action=$7 WHERE id = $8;',
    values: [date, number, details, type, amount, status, actions, id]
  }
  pool.query(order_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })

});
router.delete('/delete/:id', (req, res) => {
  var id = req.params.id;
  var order_query = {
    text: 'DELETE FROM ordersmanagement WHERE id= $1',
    values: [id]
  }
  pool.query(order_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var order_query = {
    text: 'SELECT *  FROM ordersmanagement',
  }
  pool.query(order_query, (err, req) => {
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
  var order_query = {
    text: 'SELECT *  FROM ordersmanagement WHERE id = $1',
    values: [id]
  }
  pool.query(order_query, (err, req) => {
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