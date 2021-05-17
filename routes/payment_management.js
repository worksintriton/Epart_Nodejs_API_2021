var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create', (req, res) => {

  var sellerName = req.body.sellerName;
  var numberOfOrders = req.body.numberOfOrders;
  var totalAmount = req.body.totalAmount;
  var commissionAmount = req.body.commissionAmount;
  var sellerAmount = req.body.sellerAmount;
  var status = req.body.status;
  var actions = req.body.action;

  var payment_query = {
    text: 'INSERT INTO paymentmanagement (seller_name,number_of_orders,total_amount, commission_amount, seller_amount, status,action) VALUES ($1,$2,$3,$4,$5,$6,$7);',
    values: [sellerName, numberOfOrders, totalAmount, commissionAmount, sellerAmount, status, actions]
  }
  pool.query(payment_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});
router.put('/update/:id', (req, res) => {

  var sellerName = req.body.sellerName;
  var numberOfOrders = req.body.numberOfOrders;
  var totalAmount = req.body.totalAmount;
  var commissionAmount = req.body.commissionAmount;
  var sellerAmount = req.body.sellerAmount;
  var status = req.body.status;
  var actions = req.body.action;

  var payment_query = {
    text: 'UPDATE paymentmanagement SET seller_name=$1 number_of_orders=$2 total_amount=$3 commission_amount=$4 seller_amount=$5 status=$6 action=$7 WHERE id = $8;',
    values: [sellerName, numberOfOrders, totalAmount, commissionAmount, sellerAmount, status, actions, id]
  }
  pool.query(payment_query, (err, req) => {
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
  var payment_query = {
    text: 'DELETE FROM paymentmanagement WHERE id= $1',
    values: [id]
  }
  pool.query(payment_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var payment_query = {
    text: 'SELECT *  FROM paymentmanagement',
  }
  pool.query(payment_query, (err, req) => {
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
  var payment_query = {
    text: 'SELECT *  FROM paymentmanagement WHERE id = $1',
    values: [id]
  }
  pool.query(payment_query, (err, req) => {
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