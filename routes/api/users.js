const express = require('express');
const router = express.Router();
const UserModel = require('../../models/user.model');
const passport = require('passport');


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//simple api
router.post('/simple', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json({
        message: 'Fobidden',
      })
    } else {
      res.json({
        authData,
        message: "Worked!"
      });
    }
  });
})

// register user
router.post('/registeruser', function (req, res, next) {
  UserModel.findUserByUserName(req.body.username).then(existUser => {
    if (existUser)
      res.status(500).json("Người dùng đã tồn tại!");
    else {
      UserModel.registerUser(req.body).then(newUser => {
        res.status(200).json({ newUser: newUser })
      }).catch(err => {
        res.status(500).json({ newUser: null, err: err });
      })
    }
  });
})

// login
// router.post('/login', function (req, res) {
//   const user = {
//     username: req.body.username,
//     password: req.body.password
//   }
//   UserModel.findUserByUserName(user.username).then(existUser => {
//     if (existUser.password === user.password) {
//       // jwt.sign({ user: user }, 'secretkey', { expiresIn: '60s' }, (err, token) => {
//       jwt.sign({ user: user }, 'secretkey',(err, token) => {
//         res.json({
//           message: "Đăng nhập thành công!",
//           token,
//         });
//       });
//     }
//     else {
//       res.status(500).send("Sai tên người dùng hoặc mật khẩu");
//     }
//   }).catch(err => {
//     res.status(500).send("Sai tên người dùng hoặc mật khẩu!");
//   })
// });

// login
router.post('/login', (req, res) => {
  console.log('reach api');

  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/error',
  })(req, res);
});

// edit user profile
router.post('/edituserprofile', function (req, res, next) {
  UserModel.editUserProfile(req.body).then(editedUserProfile => {
    res.status(200).json(editedUserProfile);
  }).catch(err => {
    res.status(500).json(err);
  })
})

// delete user
router.post('/deleteuser', function (req, res, next) {
  UserModel.deleteUser(req.body.id).then(deletedUser => {
    res.status(200).json(deletedUser);
  }).catch(err => {
    res.status(500).json({ err: err });
  })
});

// verify Token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    console.log(req.token);
    next();
  } else {
    res.status(403).send('Forbidden');
    next();
  }
}
module.exports = router;
