var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create', (req, res) => {

  var email = req.body.email;
  var password = req.body.password;
  var contact = req.body.contact;
  var userType = req.body.userType;
  var userName = req.body.userName;
  var firebaseToken = req.body.firebaseToken;

  var appUser_query = {
    text: 'INSERT INTO app_user (email,password, contact, userType, userName, firebaseToken) VALUES ($1,$2,$3,$4,$5,$6);',
    values: [email, password, contact, userType, userName, firebaseToken]
  }
  pool.query(appUser_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully created" });
    }
  })
});
router.put('/update/:id', (req, res) => {

  var name = req.body.name;
  var userType = req.body.userType;
  var reg_status = req.body.reg_status;
  var email = req.body.email;
  var actions = req.body.action;

  var appUser_query = {
    text: 'UPDATE app_user SET email=$1 password=$2 contact=$3 userType=$4 userName=$5 firebaseToken=$6 WHERE id = $7;',
    values: [email, password, contact, userType, userName, firebaseToken]
  }
  pool.query(appUser_query, (err, req) => {
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
  var appUser_query = {
    text: 'DELETE FROM app_user WHERE id= $1',
    values: [id]
  }
  pool.query(appUser_query, (err, req) => {
    {
      if (err) {
        console.log(err.stack);
        res.json({ success: false, msg: "Error in database", data: [], code: 500 });
      } else {
        res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
      }
    })
});
router.get('/getlist', (req, res) => {
  var appUser_query = {
    text: 'SELECT *  FROM app_user',
  }
  pool.query(appUser_query, (err, req) => {
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
  var appUser_query = {
    text: 'SELECT *  FROM app_user WHERE id = $1',
    values: [id]
  }
  pool.query(appUser_query, (err, req) => {
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