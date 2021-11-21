"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/data_handler');

router.route('/')
    .get((req, res) => {
        dataHandler.getUsers(req, res);
    })
    .post((req, res) => {
        dataHandler.createUser(req, res);
    });

router.route('/:email')
    .get((req, res) => {
        dataHandler.getUserByEmail(req, res);
    });

module.exports = router;