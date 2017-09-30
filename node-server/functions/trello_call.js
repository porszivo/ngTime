let config = require('../config/config');

let trellourl = 'https://api.trello.com/1/boards/';
let board = 'khH8JdZB/';
let cards = 'cards/?fields=name';
let keyToken = 'key=' + config.trelloKey + '&token=' + config.trelloToken;

let urlBuild = trellourl + board + cards + keyToken;

let options = { method: 'GET',
    url: urlBuild
};

module.exports = {
    options: options,
    trellourl: trellourl,
    keyToken: keyToken,
    cards: cards
};