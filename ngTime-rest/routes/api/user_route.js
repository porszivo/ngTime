let crypte = require('../../functions/password_crypt');

let db = require('../../config/database');
let config = require('../../config/config');
let jwt = require('jsonwebtoken');
let user = require('../../functions/user_functions');
let sql = require('../../functions/loadQueries').users;

module.exports = {
    createNewUser: createNewUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    getUserData: getUserData
};

/**
 * Create a new User (User register process)
 *
 * Password will be hashed, jwt token for email authentication
 *
 * */
function createNewUser(req, res, next) {
    req.body.password = crypte.cryptPassword(req.body.password);
    db.none(sql.userRegister, req.body)
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted record'
                });
        })
        .catch(function (err) {
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
    const {username, password} = req.body;
    if (!username || !password) {
        return res.json({status: 400, message: 'Bad request'});
    } else {
        db.one(sql.userLogin, username)
            .then(data => {
                if (crypte.comparePassword(password, data.password)) {
                    const token = jwt.sign(
                        {id: data.id, name: data.name},
                        config.secret
                    );
                    res.status(200)
                        .json({token: token});
                } else {
                    return res
                        .json({status: 401, message: 'Bad credentials'});
                }
            })
            .catch(err => {
                console.error(err);
                return res.status(500);
            });
    }
}

function logoutUser(req, res, callback) {
    res.status(200)
        .send('Logged out');
}

function getUserData(req, res, callback) {
    const token = req.headers.token;
    user.verifyToken(token, function (id) {
        if (id < 0) {
            res.status(401)
                .json({
                    message: 'Bad credentials'
                });
        }
        db.any(sql.userData, id)
            .then(function (data) {
                res.status(200)
                    .json({
                        message: data
                    });
            })
            .catch(function (err) {
                console.log(err);
                res.status(500);
            });
    });
}