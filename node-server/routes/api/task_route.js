const db            = require('../../config/database');
const config        = require('../../config/config');
const sql           = require('../../functions/loadQueries').tasks;
const trello        = require('../../functions/trello_call');
const apirequest    = require('request');
const user          = require('../../functions/user_functions');

module.exports = {
    getAllTasks: getAllTasks,
    createNewTask: createNewTask,
    taskExistsInDatabase: taskExistsInDatabase
};

let allTasks = [];
let url = trello.trellourl + "board.boardid" +  '?' + trello.keyToken;

/**
 * REST Endpoint to get all Tasks
 *
 * @param req
 * @param res
 * @param next
 */
function getAllTasks(req, res) {
    user.verifyToken(req.headers.token, (id) => {
        if(id === -1) return res.status(500).json({ status: 500, message: "Bad credentials"});
        db.any(sql.taskSelect, id)
            .then((result) => {
                return res.status(200).json({ status: 200, data: result});
            })
            .catch((err) => console.log(err));
    });
}

/**
 * Check if Task is in Database
 * @param task
 * @param callback
 * @returns {boolean}
 */
function taskExistsInDatabase(task) {
    task.description = task.name;
    task.type = 'trello';
    return db.task(t => {
        return t.oneOrNone('SELECT id FROM task WHERE id = $1', task.id, u => u && u.id)
            .then(taskId => {
                if(taskId) {
                    return taskId;
                } else {
                    return writeTaskToDatabase(task);
                }
            });
    });
}

/**
 *
 * @param callback
 */
function getTrelloTasks(callback) {
    apirequest(trello.options, function(err, res, body) {
        if(err) throw new Error(err);

        let data = JSON.parse(body);
        callback(data);
    })
}

/**
 * @param callback
 */
function getAllTrelloBoards(callback) {
    db.any('SELECT boardid FROM trello_board')
        .then(function(result) {
            callback(result);
        })
        .catch(errorhandling(err));
}

/**
 * TODO: Needs rework, bad pattern
 * @param callback
 */
function getTasksFromDatabase(callback) {
    db.any('select * from task')
        .then(function(result) {
            callback(result);
        })
        .catch(function(error) { console.log(error); });
}

/**
 * REST Endpoint to create a new task
 * @param req
 * @param res
 */
function createNewTask(req, res) {
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

}

/**
 *
 * @param task
 */
function writeTaskToDatabase(task) {
    db.any(sql.taskInsert, task)
        .then(function() {
            allTasks.push(task);
            return;
        })
}

function errorhandling(err) {
    console.log("SQLError: " + err);
}