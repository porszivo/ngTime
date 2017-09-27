var crypte = require('../../functions/password_crypt');

var db = require('../../config/database');
var config = require('../../config/config');
var jwt = require('jsonwebtoken');
var user = require('../../functions/user_functions');
var sql = require('../../functions/loadQueries').users;

var trello = require('../../functions/trello_call');
var apirequest = require('request');

module.exports = {
    createNewUser: createNewUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    getUserData: getUserData,
    getTrelloBoards: getTrelloBoards,
    addTrelloBoard: addTrelloBoard,
    editTrelloBoard:editTrelloBoard
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
        db.one(sql.userLogin, req.body['username'])
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

function logoutUser(req, res, callback) {
    res.status(200)
        .send("Logged out");
}

function getUserData(req, res, callback) {
    var token = req.headers.token;
    user.verifyToken(token, function(id) {
        if(id < 0) {
            res.status(401)
                .json({
                    message: 'Bad credentials'
                });
        }
        db.any(sql.userData, id)
            .then(function(data) {
                res.status(200)
                    .json({
                        message: data
                    })
            })
            .catch(function(err) {
                console.log(err);
                res.status(500);
            });
    })
}

/**
 * TODO: POD
 * @param req
 * @param res
 * @param callback
 */
function getTrelloBoards(req, res, callback) {
    user.verifyToken(req.headers.token, function(id) {
        if (id < 0) {
            res.status(401)
                .json({
                    status: 401,
                    message: "Bad credentials"
                })
        }
        db.any(sql.userTrelloBoard, id)
            .then(function(data) {
                res.status(200)
                    .json({
                        status: 200
                        , data: data})
            })
            .catch(function(err) {
                console.log(err);
                res.status(500);
            });
    });
}

function addTrelloBoard(req, res, callback) {
    user.verifyToken(req.headers.token, function(id) {
        if (id < 0) {
            res.status(401)
                .json({
                    status: 401,
                    message: "Bad credentials"
                })
        }
        let board = {uid: id, boardid: req.body.boardid};
        let url = trello.trellourl + board.boardid + '?' + trello.keyToken;
        apirequest({method: 'GET', url: url}, function(error, response, body ) {
            if(response.statusCode !== 200) {
                res.status(400)
                    .json({
                        status: 400,
                        message: 'Board not found!'
                    })
            } else {
                board.boardname = JSON.parse(body).name;
                db.any(sql.userTrelloBoardInsert, board)
                 .then(function() {
                    res.status(200)
                        .json({
                            status: 200,
                            message: 'Board saved!'
                        })
                 })
                    .catch(function(err) {
                        res.status(400)
                            .json({
                                status: 400,
                                message: 'Board already in Database!'
                            })
                    });
            }
        })

    });
}

function editTrelloBoard(req, res, callback) {
    user.verifyToken(req.headers.token, function(id) {
        if (id < 0) {
            res.status(401)
                .json({
                    status: 401,
                    message: "Bad credentials"
                })
        }
        var update = {id: id, old: req.body.old, val: req.body.val};
        db.any(sql.userTrelloBoardUpdate, update)
            .then(function() {
                res.status(200)
                    .json({
                        status: 200,
                        message: update.old + "was updated!"
                    });
            })
            .catch(function(err) {
                console.log(err);
                callback(err);
            });
    });
}