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
    removeTimeRecord: removeTimeRecord,
    getAllTasks: getAllTasks,
    createNewTask: createNewTask
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
    req.body.task = parseInt(req.body.task);
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

function getAllTasks(req, res, next) {

    /*apirequest(trello.options, function(err, res, body) {
        if (err) throw new Error(err);

        var data = JSON.parse(body);
        data.filter(function(item) {
            tasks.push({id: item.id, name: item.name, type: 'trello'});
        });
        createNewTask(tasks, function() {
            console.log("done");
        });
    });*/
    if(allTasks.length === 0) {
        getTasksFromDatabase(function(result) {
            allTasks = result;
            sendTasks(res);
        });
    } else {
        sendTasks(res);
    }

    function sendTasks(res) {
        res.json({data: allTasks});
    }
}

function getTasksFromDatabase(callback) {
    db.any('select * from task')
        .then(function(result) {
            callback(result);
        })
        .catch(function(error) { console.log(error); });
}

function createNewTask(req, res, callback) {
    user.verifyToken(req.headers.token, function(data) {
        if(data>=0) {
            task = req.body;
            task.id = uuid.v4();
            task.type = 'ngTime';
            writeTaskToDatabase(req.body, function(data) {
                res.json({status: 200, message: true});
            });
        }
    })
    // task.filter(function(item) {
    //     ids.push('\'' + item.id + '\'');
    // });
    // var qid = ids.join(',');
    // console.log(qid);
    // db.any('select id, name from task where id in ( $1^ )', qid)
    //     .then(function(result){
    //         task.filter(function(item) {
    //             item.indexOf(result)
    //         })
    //     });

}

function writeTaskToDatabase(task) {
    db.any('insert into task (id, name, description, type ) values ( ${id} , ${name} , ${description} , ${type} )', task)
        .then(function() {
            return;
        })
}