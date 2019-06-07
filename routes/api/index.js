const router = require('express').Router();

router.use('/cameras', require('./cameras'));

module.exports = router;
