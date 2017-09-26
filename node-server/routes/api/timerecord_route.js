var db = require('../../config/database');
var user = require('../../functions/user_functions');
var config = require('../../config/config');
var sql = require('../../functions/loadQueries').timerecords;
var uuid = require('uuid');

var trello = require('../../functions/trello_call');
var apirequest = require('request');

module.exports = {
    getAllTimeRecords: getAllTimeRecords,
    getSingleTimeRecord: getSingleTimeRecord,
    createTimeRecord: createTimeRecord,
    removeTimeRecord: removeTimeRecord
};

var allTasks = [];

function getAllTimeRecords(req, res, next) {
    req.body.task = parseInt(req.body.task);
    user.verifyToken(req.headers.token, function(id) {
        if (id < 0) {
            res.status(401)
                .json({
                    status: 401,
                    message: "Bad credentials"
                })
        }
        db.any('select r.id, r.task, r.dat, r.time, r.comment, t.name from timerecord r left join task t on t.id = r.task where uid = $1 ORDER BY r.dat DESC', id)
            .then(function (data) {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data,
                        message: 'Retrieved ALL records'
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });
}

function getSingleTimeRecord(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.one('select * from timerecord where id = $1', pupID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE record'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createTimeRecord(req, res, next) {
    user.verifyToken(req.headers.token, function(id) {
        if(id<0) {
            res.status(401)
                .json({
                    status: 401,
                    message: "Bad credentials"
                })
        }
        var params = req.body;
        params.id = id;
        db.none(sql.timerecordCreate, params)
            .then(function() {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Inserted record'
                    });
            })
            .catch(function(err){
                console.log(err.message);
                return next(err);
            });
    });
}

function removeTimeRecord(req, res, next) {
    var params = {};
    user.verifyToken(req.headers.token, function(id) {
        if (id < 0) {
            res.status(401)
                .json({
                    status: 401,
                    message: "Bad credentials"
                })
        }

        params.id = parseInt(req.params.id);
        params.uid = id;

        db.result('delete from timerecord where id = ${id} AND uid = ${uid}', params)
            .then(function (result) {
                res.status(200)
                    .json({
                        status: 'success'
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });

}