var crypte = require('../../functions/password_crypt');

var db = require('../../config/database');
var config = require('../../config/config');
var jwt = require('jsonwebtoken');

module.exports = {
    createNewUser: createNewUser,
    loginUser: loginUser
};

/**
 *
 * Creates User with Post Parameter
 * Password will be hashed before stored in the database
 *
 */
function createNewUser(req, res, next) {
    req.body.password = crypte.cryptPassword(req.body.password);
    db.none('insert into user_tbl(name, password)' +
        'values(${name}, ${password})', req.body)
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
        console.log(req.body);
        db.one('select * from user_tbl where name = $1', req.body['username'])
            .then(function (data) {
                if (crypte.comparePassword(req.body['password'], data.password)) {
                    var token = jwt.sign(data.name, config.secret);
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
    }
}

