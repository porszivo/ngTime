var jwt = require('jsonwebtoken');
var config = require('../config/config');
var db = require('../config/database');

module.exports = {
    verifyToken: verifyToken
};

function verifyToken(token, callback) {
    var decode = jwt.verify(token, config.secret);
    db.one('select * from user_tbl where id = $1', decode.id)
        .then(function(data) {
            if(data) return callback(data.id);
            return callback(-1);
        })
        .catch(function(err) {
            return callback(err);
        });
}

function calculateData(data) {



    return null;
}