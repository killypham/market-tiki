const router = require('express').Router();

router.use('/cameras', require('./cameras'));
router.use('/user', require('./users'));

module.exports = router;
