const router = require('express').Router();
const User = require('../../models/user.model');

router.get('/', (req, res) => {
  User.GetAllUser().then(users => {
    res.status(200).json(users)
  }).catch(err => {
    res.status(500).json({users: null, err: err});
  })
})

router.post('/', (req, res) => {
  User.RegisterUser(req.body).then(registedUser => {
    res.status(201).json(registedUser)
  }).catch(err => {
    res.status(500).json({registedUser: null, err: err});
  })
})

module.exports = router;