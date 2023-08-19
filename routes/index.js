var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('export', { title: 'Welcome To The Student Result Management System' });
});

module.exports = router;
