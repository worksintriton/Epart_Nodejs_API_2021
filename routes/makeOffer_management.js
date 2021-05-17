var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create', (req, res) => {

  var buyerName = req.body.buyerName;
  var productName = req.body.productName;
  var productNumber = req.body.productNumber;
  var quantity = req.body.quantity;
  var price = req.body.price;
  var actualPrice = req.body.actualPrice;
  var askingPrice = req.body.askingPrice;
  var status = req.body.status;
  var actions = req.body.action;

  var makeOffer_query = {
    text: 'INSERT INTO makeoffermanagement (buyer_name, product_name, product_number, quantity, price, actual_price, asking_price, status, actions) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);',
    values: [buyerName, productName, productNumber, quantity, price, actualPrice, askingPrice, status, actions]
  }
  pool.query(makeOffer_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});
router.put('/update/:id', (req, res) => {

  var buyerName = req.body.buyerName;
  var productName = req.body.productName;
  var productNumber = req.body.productNumber;
  var quantity = req.body.quantity;
  var price = req.body.price;
  var actualPrice = req.body.actualPrice;
  var askingPrice = req.body.askingPrice;
  var status = req.body.status;
  var actions = req.body.action;

  var makeOffer_query = {
    text: 'UPDATE makeoffermanagement SET buyer_name=$1 product_name=$2 product_number=$3 quantity=$4 price=$5 actual_price=$6 asking_price=$7 status=$8 actions=$9 WHERE id = $10;',
    values: [buyerName, productName, productNumber, quantity, price, actualPrice, askingPrice, status, actions, id]
  }
  pool.query(makeOffer_query, (err, req) => {
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
  var makeOffer_query = {
    text: 'DELETE FROM makeoffermanagement WHERE id= $1',
    values: [id]
  }
  pool.query(makeOffer_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var makeOffer_query = {
    text: 'SELECT *  FROM makeoffermanagement',
  }
  pool.query(makeOffer_query, (err, req) => {
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
  var makeOffer_query = {
    text: 'SELECT *  FROM makeoffermanagement WHERE id = $1',
    values: [id]
  }
  pool.query(makeOffer_query, (err, req) => {
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