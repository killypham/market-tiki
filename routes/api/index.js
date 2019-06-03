const router = require('express').Router();

router.use('/laptop', require('./laptop'));

module.exports = router;