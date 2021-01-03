const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

const app = express();
const users = require('./routes/users');
const db = require('./util/db.js');

const port = 3000;

app.use(cors());

db.connect().then(r => {
    console.log('Connection to Database established');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./util/passport').token(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});
