const express = require('express');
const router = express.Router();
const UserModel = require('../../models/user.model');
const bodyParser = require('body-parser');

// register user
router.post('/registeruser', function (req, res, next) {
  UserModel.findUserByUserName(req.body.userName).then(existUser => {
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

// login user
router.post('/login', function (req, res, next) {
  UserModel.findUserByUserName(req.body.userName).then(existUser => {
    if (existUser.password == req.body.password)
      res.status(200).json("Đăng nhập thành công!");
    else res.status(500).json("Sai tên người dùng hoặc mật khẩu");
  }).catch(err => {
    res.status(500).json("Sai tên người dùng hoặc mật khẩu!");
  })
})

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
})

module.exports = router;
