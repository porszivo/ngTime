const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const settings = require('../config/config');
const passport = require('passport');


router.post('/register', (req, res, next) => {
    const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    User.addUser(newUser)
        .then(
            user => {

                if (!user) {
                    res.status(409).json('Username or Email already exists!').send();
                } else {
                    res.status(201).header('location', user.ops[0]._id).send();
                }

            }
        )
        .catch(error => {
            console.log('Error while creating User', error);
            res.status(500).send();
        });
});

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username).then(user => {
        if (!user) {
            return res.status(404).json({message: 'User not found'}).send();
        }
        User.verifyPassword(password, user, (err, isMatch) => {
            if (isMatch) {
                const token = jwt.sign({
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                    , settings.secret, {expiresIn: 604800});
                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                res.status(401).send();
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({user: req.user});
    }
);

module.exports = router;
