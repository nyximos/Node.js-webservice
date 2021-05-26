const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

moduls.export = () => {
    passport.serializeUser((user,done) => {
        done(null, user.id);
    });

    passport.deserializeUser((user,done)=> {
        User.findOne({where:{id}})
        .then(user => done(null,user))
        .catch(err => done(err));
    });

    local();
    kakao();
};

