"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../../server/controllers/data_handler');

router.route('/')
    .post((req, res) => {
        dataHandler.createUser(req, res);
    })

router.route('/:email')
    .delete((req, res) => {
        dataHandler.deleteUser(req, res);
    })

module.exports = router;