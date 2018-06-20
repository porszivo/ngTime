var express = require('express');
var router = express.Router();

var userq = require('./api/user_route');
var tasks = require('./api/task_route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/tasks', tasks.getAllTasks);
router.post('/api/tasks', tasks.createNewTask);

router.post('/api/user', userq.createNewUser);
router.post('/api/login', userq.loginUser);
router.post('/api/logout', userq.logoutUser);
router.get('/api/user', userq.getUserData);
router.get('/api/trelloBoard', userq.getTrelloBoards);
router.post('/api/trelloBoard', userq.addTrelloBoard);
router.put('/api/trelloBoard', userq.editTrelloBoard);

module.exports = router;
