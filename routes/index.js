var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('export', { title: 'Welcome to the Student Result Management System' });
});

module.exports = router;
