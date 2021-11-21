"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/datahandler/orders_data_handler');

router.route('/:uuid')
    .get((req, res) => {
        dataHandler.getOrder(req, res);
    });

module.exports = router;