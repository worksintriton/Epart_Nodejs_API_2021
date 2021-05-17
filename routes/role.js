var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create', (req, res) => {
  var role_name = req.body.role_name;
  var created_at = new Date();
  var modified_at = new Date();
  var created_by = 1;
  var modified_by = 1;
  var role_query = {
    text: 'INSERT INTO role (role_name,created_at,modified_at,created_by,modified_by) VALUES ($1,$2,$3,$4,$5);',
    values: [role_name, created_at, modified_at, created_by, modified_by]
  }
  pool.query(role_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});
router.put('/update/:id', (req, res) => {
  var role = req.body.name;
  var id = req.params.id;
  var role_query = {
    text: 'UPDATE role SET name=$1  WHERE id = $2;',
    values: [role, id]
  }
  pool.query(role_query, (err, req) => {
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
  var role_query = {
    text: 'DELETE FROM role WHERE id= $1',
    values: [id]
  }
  pool.query(role_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var role_query = {
    text: 'SELECT *  FROM role',
  }
  pool.query(role_query, (err, req) => {
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
  var role_query = {
    text: 'SELECT *  FROM role WHERE id = $1',
    values: [id]
  }
  pool.query(role_query, (err, req) => {
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