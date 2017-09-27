var config = require('../config/config');

var trellourl = 'https://api.trello.com/1/boards/';
var board = 'khH8JdZB/'
var cards = 'cards/?limit=2&fields=name&members=true&member_fields=fullName';
var keyToken = 'key=' + config.trelloKey + '&token=' + config.trelloToken;

var urlBuild = trellourl + board + cards + keyToken;

var options = { method: 'GET',
    url: urlBuild
};

module.exports = {
    options: options,
    trellourl: trellourl,
    keyToken: keyToken
};