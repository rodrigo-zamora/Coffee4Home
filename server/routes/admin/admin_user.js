"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../../controllers/datahandler/users_data_handler');

router.route('/')
    .get((req, res) => {
        dataHandler.getUsers(req, res);
    })
    .post((req, res) => {
        dataHandler.createUser(req, res);
    });

//router.route('/:email', tokenUtils.verifyToken);

router.route('/:email')
    .get((req, res) => {
        dataHandler.getUserByEmail(req, res);
    })
    .delete((req, res) => {
        if (req.params.email.includes('@')) {
            dataHandler.deleteUser(req, res);
        } else {
            dataHandler.deleteUserByUUID(req, res);
        }
    });

module.exports = router;