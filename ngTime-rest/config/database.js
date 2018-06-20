const promise = require('bluebird');
const config = require('./config');
const options = {
    promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = config.database;
const db = pgp(connectionString);

module.exports = db;
