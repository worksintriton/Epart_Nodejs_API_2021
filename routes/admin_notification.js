var express = require('express');
var router = express.Router();
var pool = require('../config/db');
var jwt_decode = require('jwt-decode');

var isoDateString = new Date().toISOString();

router.post('/create', (req, res) => {
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);

  var title = req.body.title;
  var description = req.body.description;
  var imagepath = req.body.imagepath;
  var person_id = decoded.users.id;

  var adminNotification_query = {
    text: 'INSERT INTO admin_notification (title, description, imagepath, user_id, date_time) VALUES ($1,$2,$3,$4,$5);',
    values: [title, description, imagepath, person_id, isoDateString]
  }
  pool.query(adminNotification_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully created" });
    }
  })
});
router.put('/update/:id', (req, res) => {
  let token = req.headers.authorization;
  var decoded = jwt_decode(token);
  var person_id = decoded.users.id;

  var name = req.body.name;
  var access = req.body.access;

  var adminNotification_query = {
    text: 'UPDATE admin_notification SET title=$1 description=$2 imagepath=$3 user_id=$4 date_time=$5 WHERE id = $6;',
    values: [title, description, imagepath, person_id, isoDateString, id]
  }
  pool.query(adminNotification_query, (err, req) => {
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
  var adminNotification_query = {
    text: 'DELETE FROM admin_notification WHERE id= $1',
    values: [id]
  }
  pool.query(adminNotification_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var adminNotification_query = {
    text: 'SELECT *  FROM admin_notification',
  }
  pool.query(adminNotification_query, (err, req) => {
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
  var adminNotification_query = {
    text: 'SELECT *  FROM admin_notification WHERE id = $1',
    values: [id]
  }
  pool.query(adminNotification_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});

module.exports = router;