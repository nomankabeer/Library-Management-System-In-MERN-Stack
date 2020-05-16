const passport    = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
const UserModel = require('../models/User');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {

        //Assume there is a DB module pproviding a global UserModel
        return UserModel.findOne({email, password})
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }

                return cb(null, user, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return cb(err);
            });
    }
));


var jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.ACCESS_TOKEN_SECRET
};
passport.use(new JWTStrategy( jwtOptions , function (jwtPayload, cb) {
console.log(jwtPayload)
    var user = { username: jwtPayload.username , password: jwtPayload.password };
        //find the user in db if needed
        // console.log(user)
        return UserModel.findOne( user )
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));