"use strict";

const router = require('express').Router();
const dataHandler = require('./datahandler/users_data_handler');

router.route('/login')
  .post((req, res) => dataHandler.login(req, res));

  /* dataHandler.login(email, password, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }); */

module.exports = router;