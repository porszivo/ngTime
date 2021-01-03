const settings = require('../config/config');
const User = require('./db');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = {

    token: (passport) => {
        let opts = {};
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = settings.secret;
        passport.use(new JwtStrategy(opts, (payload, done) => {
            const user = User.getOneById(payload._id, 'user');
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        }));
    }

};
