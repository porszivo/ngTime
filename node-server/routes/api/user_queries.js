var crypte = require('../../functions/password_crypt');

var db = require('../../config/database');
var config = require('../../config/config');
var jwt = require('jsonwebtoken');

module.exports = {
    createNewUser: createNewUser,
    loginUser: loginUser,
    logoutUser: logoutUser
};

/**
 * Create a new User (User register process)
 *
 * Password will be hashed, jwt token for email authentication
 *
 * */
function createNewUser(req, res, next) {
    req.body.password = crypte.cryptPassword(req.body.password);
    db.none('insert into user_tbl(name, password, email)' +
        'values(${username}, ${password}, ${email})', req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted record'
                });
        })
        .catch(function(err){
            res.status(500)
                .json({
                    status: 'error',
                    message: err.detail
                });
        });
}

/**
 * Login of a User returning JWT
 */
function loginUser(req, res, next) {
    if(req.body['username'] && req.body['password']) {
        db.one('select * from user_tbl where name = $1', req.body['username'])
            .then(function (data) {
                if (crypte.comparePassword(req.body['password'], data.password)) {
                    var token = jwt.sign(
                        {'id': data.id, 'name': data.name}, config.secret);
                    res.status(200)
                        .json({token: token});
                } else {
                    res.status(401)
                        .json({
                            status: 401,
                            message: "Bad credentials"
                        });
                }
            })
            .catch(function (err) {
                res.status(500)
                    .json({
                        status: 500,
                        message: err.message
                    });
            })
    } else {
        res.status(401)
            .json({
                status: 401,
                message: 'Bad credentials'
            });
    }
}

function logoutUser(req, res, next) {
    res.status(200)
        .send("Logged out");
}