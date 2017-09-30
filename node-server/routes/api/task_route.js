var db = require('../../config/database');
var config = require('../../config/config');
var sql = require('../../functions/loadQueries').tasks;
var trello = require('../../functions/trello_call');
var apirequest = require('request');

module.exports = {
    getAllTasks: getAllTasks,
    createNewTask: createNewTask
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
    getAllTrelloBoards(boards => {
        boards.map(function(obj) {
            url = trello.trellourl + obj.boardid + '/' + trello.cards + '&' + trello.keyToken;
            apirequest({method: 'GET', url: url}, function(err, res, body) {
                JSON.parse(body).map(taskExistsInDatabase);
            })
        });
    });

    /*getNewTrelloTasks(function(result) {
        result.map(taskExistsInDatabase);
    });*/

    getTasksFromDatabase(function(result) {
            allTasks = result;
            sendTasks(res);
    });

    function sendTasks(res) {
        res.json({data: allTasks});
    }
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

                //return taskId || t.one(sql.trelloInsert, task);
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