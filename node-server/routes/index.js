var express = require('express');
var router = express.Router();

var userq = require('./api/user_route');
var timerecords = require('./api/timerecord_route');
var tasks = require('./api/task_route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/timerecord', timerecords.getAllTimeRecords);
router.get('/api/timerecord/:id', timerecords.getSingleTimeRecord);
router.post('/api/timerecord', timerecords.createTimeRecord);
router.delete('/api/timerecord/:id', timerecords.removeTimeRecord);

router.get('/api/tasks', tasks.getAllTasks);
router.post('/api/tasks', tasks.createNewTask);

router.post('/api/user', userq.createNewUser);
router.post('/api/login', userq.loginUser);
router.post('/api/logout', userq.logoutUser);
router.get('/api/user', userq.getUserData);

module.exports = router;
