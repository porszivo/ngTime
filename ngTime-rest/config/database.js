var promise = require('bluebird');
var config = require('./config');
var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = config.database;
var db = pgp(connectionString);

module.exports = db;
