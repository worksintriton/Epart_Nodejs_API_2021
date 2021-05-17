var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create', (req, res) => {
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

  var sellerName = req.body.sellerName;
  var productType = req.body.productType;
  var productName = req.body.productName;
  var partName = req.body.partName;
  var barcodeNumber = req.body.barcodeNumber;
  var quantity = req.body.quantity;
  var price = req.body.price;
  var actions = req.body.action;


  var product_query = {
    text: 'INSERT INTO productmanagement (sellerName,product_type,product_name,part_number,barcode_number,quantity,price,created_by, modified_by, created_at, modified_at,action) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);',
    values: [sellerName, productType, productName, partName, barcodeNumber, quantity, price, person_id, person_id, isoDateString, isoDateString, actions]
  }
  pool.query(product_query, (err, req) => {
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

  var sellerName = req.body.sellerName;
  var productType = req.body.productType;
  var productName = req.body.productName;
  var partName = req.body.partName;
  var barcodeNumber = req.body.barcodeNumber;
  var quantity = req.body.quantity;
  var price = req.body.price;
  var actions = req.body.action;
  var id = req.params.id;

  var product_query = {
    text: 'UPDATE productmanagement SET sellerName=$1 productType=$2 productName=$3 partName=$4 barcodeNumber=$5 quantity=$6 price=$7 modified_by=$8 modified_at=$9 action=$10 WHERE id = $11;',
    values: [sellerName, productType, productName, partName, barcodeNumber, quantity, price, person_id, isoDateString, actions, id]
  }
  pool.query(product_query, (err, req) => {
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
  var product_query = {
    text: 'DELETE FROM productmanagement WHERE id= $1',
    values: [id]
  }
  pool.query(product_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var product_query = {
    text: 'SELECT *  FROM productmanagement',
  }
  pool.query(product_query, (err, req) => {
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
  var product_query = {
    text: 'SELECT *  FROM productmanagement WHERE id = $1',
    values: [id]
  }
  pool.query(product_query, (err, req) => {
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