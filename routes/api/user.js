const router = require('express').Router();
const User = require('../../models/user.model');
const { verifyToken } = require('../../utils').Auth;

// Get all users
router.get('/', (req, res) => {
  User.getAllUser().then(users => {
    res.status(200).json(users)
  }).catch(err => {
    res.status(500).json({ users: null, err: err });
  })
})

// Register user
router.post('/register', (req, res) => {
  User.registerByEmail(req.body).then(registedUser => {
    res.status(201).json(registedUser)
  }).catch(err => {
    res.status(500).json({ registedUser: null, err: err });
  })
})

// Login by email
router.post('/login', (req, res) => {
  User.loginByEmail(req.body).then(token => {
    res.header('auth-token', token)
      .send(token)
    // .redirect('/');
  }).catch(err => {
    res.status(500).json(err);
  })
})

// Update user profile
router.post('/profile', verifyToken, (req, res) => {
  User.updateUserProfile(req.user._id, req.body).then(newInfo => {
    res.status(200).json(newInfo);
  }).catch(err => {
    res.status(500).json({ newInfo: null, err: err });
  })
})

router.post('/changepassword', verifyToken, (req, res) => {
  User.changePassword(req.user._id, req.body).then(success => {
    res.status(200).json(success);
  }).catch(err => {
    res.status(500).json({success: false, err: err})
  })
})

module.exports = router;