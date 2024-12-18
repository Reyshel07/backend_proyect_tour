const JwStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
const Keys = require('./Keys');

module.exports = function(passport) {

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secretOrKey;
    passport.use(new JwStrategy(opts, (jwt_payload, done) => {
        User.findUserById(jwt_payload,(err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        })
    }))
}
    
