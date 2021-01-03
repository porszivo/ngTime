const config = require('../config/config');
const MongoClient = require('mongodb').MongoClient;

const uri = config.database.url;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = {

    connect: async () => {
        if (!client.isConnected()) {
            await client.connect().catch(err => {
                    console.error('Error while connecting to database ' + err);
                }
            );
        }
    },

    getOneById: async (id, collection) => {
        const db = await client.db(config.database.name);
        return db.collection(collection).findOne({id: id});
    },

    getOneByUsername: async (name, collection) => {
        const db = await client.db(config.database.name);
        return db.collection(collection).findOne({username: name});
    },

    isUserInDatabase: async (user, collection) => {
        const db = await client.db(config.database.name);
        return db.collection(collection).findOne({
            $or: [
                {email: user.email},
                {username: user.username}
            ]
        }).then(
            (dbUser) => {
                return dbUser != null;
            }
        );
    },

    createOne: async (obj, collection) => {
        const db = await client.db(config.database.name);
        return db.collection(collection).insertOne(obj).catch(
            err => {
                console.log('Error while writing data to database', err);
            }
        );
    }
};
