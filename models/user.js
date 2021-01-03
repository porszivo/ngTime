const bcrypt = require('bcryptjs');
const db = require('../util/db');

const collection = 'user';

const UserSchema = {
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
};

module.exports = {

    addUser: async (user) => {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
        const exists = await db.isUserInDatabase(user, 'user');
        if (!exists) {
            return await db.createOne(user, 'user');
        }
        return null;
    },

    getUserById: async (id) => {
        return await db.getOneById(id, 'user');
    },

    getUserByUsername: async (username) => {
        return await db.getOneByUsername(username, 'user');
    },

    checkIfExists: async (user) => {
        return await db.isUserInDatabase(user, 'user');
    },

    verifyPassword: (password, user, callback) => {
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);
        });
    }
};
