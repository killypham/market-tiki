var express = require('express');
var router = express.Router();

router.use('/api', require('./api'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/error', function (req, res, next) {
  res.json({
    message: "Dang nhap that bai"
  })
});

router.get('/login', function (req, res, next) {
  res.render('LoginPage');
});

module.exports = router;
