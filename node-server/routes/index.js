var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/timerecord', db.getAllTimeRecords);
router.get('/api/timerecord/:id', db.getSingleTimeRecord);
router.post('/api/timerecord', db.createTimeRecord);
router.put('/api/timerecord/:id', db.updateTimeRecord);
router.delete('/api/timerecord/:id', db.removeTimeRecord);
router.get('/api/tasks', db.getAllTasks);

module.exports = router;
