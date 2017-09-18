var db = require('../../config/database');

module.exports = {
    getAllTimeRecords: getAllTimeRecords,
    getSingleTimeRecord: getSingleTimeRecord,
    createTimeRecord: createTimeRecord,
    updateTimeRecord: updateTimeRecord,
    removeTimeRecord: removeTimeRecord,
    getAllTasks: getAllTasks
};

function getAllTimeRecords(req, res, next) {
    db.any('select r.id, r.task, r.dat, r.time, r.comment, t.name from timerecord r left join task t on t.id = r.task')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL records'
                });
        })
        .catch(function(err) {
            return next(err);
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
                    message: 'Retrieved ONE puppy'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createTimeRecord(req, res, next) {
    req.body.task = parseInt(req.body.task);
    db.none('insert into timerecord(task, dat, time, comment)' +
            'values(${task}, ${dat}, ${duration}, ${comment})', req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted record'
                });
        })
        .catch(function(err){
            return next(err);
        });
}

function updateTimeRecord(req, res, next) {
    db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
        [req.body.name, req.body.breed, parseInt(req.body.age),
            req.body.sex, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated puppy'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeTimeRecord(req, res, next) {
    var recordId = parseInt(req.params.id);
    console.log(req.params);
    db.result('delete from timerecord where id = $1', recordId)
        .then(function (result) {
            res.status(200)
                .json({
                    status: 'success'
                });
        })
        .catch(function (err) {
            return next(err);
        });

}

function getAllTasks(req, res, next) {
    db.any('select * from task')
        .then(function(result) {
            res.status(200)
                .json({
                    status: 'succes',
                    message: 'All Tasks',
                    data: result
                })
        })
        .catch(function(err) {
            return next(err);
        })
}