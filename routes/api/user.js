const router = require('express').Router();
const User = require('../../models/user.model');

// Get all users
router.get('/', (req, res) => {
  User.getAllUser().then(users => {
    res.status(200).json(users)
  }).catch(err => {
    res.status(500).json({users: null, err: err});
  })
})

// Register user
router.post('/register', (req, res) => {
  User.registerByEmail(req.body).then(registedUser => {
    res.status(201).json(registedUser)
  }).catch(err => {
    res.status(500).json({registedUser: null, err: err});
  })
})

// Login by email
router.post('/login', (req, res) => {
  User.loginByEmail(req.body).then(token => {
    res.header('auth-token', token).redirect('/');
  }).catch(err => {
    res.status(500).json(err);
  })
})

module.exports = router;