"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/datahandler/products_data_handler');

router.route('/')
    .get((req, res) => {
        dataHandler.searchProducts(req, res);
    });

router.route('/:uuid')
    .get((req, res) => {
        if(req.params.uuid.includes('?')) {
            console.log('query');
            dataHandler.searchProducts(req, res);
        } else {
            dataHandler.getProductByUUID(req, res);
        }
    });

module.exports = router;