var express = require('express');
var router = express.Router();

var userq = require('./api/user_route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user', userq.createNewUser);
router.post('/api/login', userq.loginUser);
router.post('/api/logout', userq.logoutUser);
router.get('/api/user', userq.getUserData);

module.exports = router;
