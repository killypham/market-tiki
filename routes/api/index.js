const router = require('express').Router();

router.use('/cameras', require('./cameras'));
router.use('/users', require('./users'));

module.exports = router;
