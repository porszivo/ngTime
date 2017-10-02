const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
    const fullPath = path.join(__dirname, file);
    return new QueryFile(fullPath, {minify:true});
}

module.exports = {
    users: {
        userLogin: sql('./sql/user_login.sql'),
        userData: sql('./sql/user_data_select.sql'),
        userRegister: sql('./sql/user_register.sql'),
        userTrelloBoard: sql('./sql/user_trelloboard_select.sql'),
        userTrelloBoardInsert: sql('./sql/user_trelloboard_insert.sql'),
        userTrelloBoardUpdate: sql('./sql/user_trelloboard_update.sql')
    },
    timerecords: {
        timerecordCreate: sql('./sql/timerecord_create.sql'),
        timerecordSelect: sql('./sql/timerecord_select.sql')
    },
    tasks: {
        trelloInsert: sql('./sql/task_trello_insert.sql'),
        taskInsert: sql('./sql/task_insert.sql'),
        taskSelect: sql('./sql/task_select.sql')
    }
};
