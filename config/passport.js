const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const UserModel = require('../models/user.model');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      UserModel.findUserByUserName(username).then(user => {
        if (!user) {
          console.log('1');
          return done(null, false, { message: 'Người dùng không tồn tại!' });
        }

        if (password === user.password) {
          console.log('2');
          return done(null, user);
        } else {
          console.log('3');
          return done(null, false, { message: 'Sai mật khẩu!' });
        }
      }).catch(err => {
        console.log(err);
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

}
