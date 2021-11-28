"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../../controllers/datahandler/users_data_handler');

router.route('/')
    .post((req, res) => {
        dataHandler.createUser(req, res);
    });

router.route('/:email')
    .delete((req, res) => {
        if (req.params.email.includes('@')) {
            dataHandler.deleteUser(req, res);
        } else {
            dataHandler.deleteUserByUUID(req, res);
        }
    });

module.exports = router;