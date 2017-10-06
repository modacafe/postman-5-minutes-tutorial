const express = require('express');
const renderTasks = require('../helpers/renderTasks.js');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  renderTasks(res);
});

module.exports = router;
