var express = require('express');
var router = express.Router();
var pool = require('../config/db');

router.post('/create', (req, res) => {

  var carId = req.body.carid;
  var groupId = req.body.groupId;
  var subgroupId = req.body.subgroupId;
  var subgroupNodeId = req.body.subgroupNodeId;
  var partNumber = req.body.partNumber;
  var partName = req.body.partName;
  var partERPid = req.body.partERPid;
  var status = req.body.status;
  var actions = req.body.action;

  var parts_query = {
    text: 'INSERT INTO partsmanagement (car_id,group_id,subgroup_id, subgroupnode_id, partnumber, partname, part_erp_id, status,action) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);',
    values: [carId, groupId, subgroupId, subgroupNodeId, partNumber, partName, partERPid, status, actions]
  }
  pool.query(parts_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database", data: [], code: 500 });
    } else {
      res.json({ success: true, msg: "New Created Successfully", data: req.rows, code: 200 });
    }
  })
});
router.put('/update/:id', (req, res) => {

  var carId = req.body.carid;
  var groupId = req.body.groupId;
  var subgroupId = req.body.subgroupId;
  var subgroupNodeId = req.body.subgroupNodeId;
  var partNumber = req.body.partNumber;
  var partName = req.body.partName;
  var partERPid = req.body.partERPid;
  var status = req.body.status;
  var actions = req.body.action;

  var parts_query = {
    text: 'UPDATE partsmanagement SET car_id=$1 group_id=$2 subgroup_id=$3 subgroupnode_id=$4 partnumber=$5 partname=$6 part_erp_id=$7 status=$8 action=$9 WHERE id = $10;',
    values: [carId, groupId, subgroupId, subgroupNodeId, partNumber, partName, partERPid, status, actions, id]
  }
  pool.query(parts_query, (err, req) => {
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
  var parts_query = {
    text: 'DELETE FROM partsmanagement WHERE id= $1',
    values: [id]
  }
  pool.query(parts_query, (err, req) => {
    if (err) {
      console.log(err.stack);
      res.json({ success: false, msg: "Error in database" });
    } else {
      res.json({ success: true, msg: "succesfully deleted" });
    }
  })
});
router.get('/getlist', (req, res) => {
  var parts_query = {
    text: 'SELECT *  FROM partsmanagement',
  }
  pool.query(parts_query, (err, req) => {
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
  var parts_query = {
    text: 'SELECT *  FROM partsmanagement WHERE id = $1',
    values: [id]
  }
  pool.query(parts_query, (err, req) => {
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