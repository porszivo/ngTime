var express = require('express');
var router = express.Router();

var userq = require('./api/user_queries');
var timerecords = require('./api/timerecord_queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/timerecord', timerecords.getAllTimeRecords);
router.get('/api/timerecord/:id', timerecords.getSingleTimeRecord);
router.post('/api/timerecord', timerecords.createTimeRecord);
router.put('/api/timerecord/:id', timerecords.updateTimeRecord);
router.delete('/api/timerecord/:id', timerecords.removeTimeRecord);
router.get('/api/tasks', timerecords.getAllTasks);

router.post('/api/user', userq.createNewUser);
router.post('/api/login', userq.loginUser);
router.post('/api/logout', userq.logoutUser);

module.exports = router;
