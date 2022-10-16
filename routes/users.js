/* File Name: users.js   Student Name: James Yan   Student ID: 301229536   Date: 09/30/2022 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
