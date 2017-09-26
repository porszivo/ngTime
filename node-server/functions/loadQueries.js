const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
    const fullPath = path.join(__dirname, file);
    return new QueryFile(fullPath, {minify:true});
}

module.exports = {
    users: {
        userLogin: sql('./sql/user_login.sql'),
        userData: sql('./sql/user_data.sql'),
        userRegister: sql('./sql/user_register.sql')
    },
    timerecords: {
        timerecordCreate: sql('./sql/timerecord_create.sql')
    },
    tasks: {
        trelloInsert: sql('./sql/task_trello_insert.sql'),
        taskInsert: sql('./sql/task_insert.sql')
    }
};
