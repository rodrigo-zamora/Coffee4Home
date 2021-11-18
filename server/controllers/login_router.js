"use strict";

const router = require('express').Router();
const dataHandler = require('./data_handler');

router.route('/login')
  .post((req, res) => dataHandler.login(req, res));

module.exports = router;