let db = require("../../config/database");
let user = require("../../functions/user_functions");
let sql = require("../../functions/loadQueries").timerecords;

module.exports = {
    getAllTimeRecords: getAllTimeRecords,
    getSingleTimeRecord: getSingleTimeRecord,
    createTimeRecord: createTimeRecord,
    removeTimeRecord: removeTimeRecord
};

function getAllTimeRecords(req, res) {
    req.body.task = parseInt(req.body.task);
    user.verifyToken(req.headers.token, function(id) {
        if (id < 0) {
            res.status(401)
                .json({
                    status: 401,
                    message: "Bad credentials"
                });
        }
        db.any(sql.timerecordSelect, id)
            .then(function (data) {
                res.status(200)
                    .json({
                        status: "success",
                        data: data,
                        message: "Retrieved ALL records"
                    });
            })
            .catch(function (err) {
                return console.log(err);
            });
    });
}

function getSingleTimeRecord(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.one("select * from timerecord where id = $1", pupID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: "success",
                    data: data,
                    message: "Retrieved ONE record"
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
                });
        }
        let params = req.body;
        params.id = id;
        db.none(sql.timerecordCreate, params)
            .then(function() {
                res.status(200)
                    .json({
                        status: "success",
                        message: "Inserted record"
                    });
            })
            .catch(function(err){
                console.log(err.message);
                return next(err);
            });
    });
}

function removeTimeRecord(req, res, next) {
    user.verifyToken(req.headers.token, function(id) {
        if (id < 0) { return res.status(401); }

        let params = {id: parseInt(req.params.id), uid: id};
        db.none("delete from timerecord where id = ${id} AND uid = ${uid}", params)
            .then(() => res.status(200))
            .catch(function (err) {
                return next(err);
            });
    });
}