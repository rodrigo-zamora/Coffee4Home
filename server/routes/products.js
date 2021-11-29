"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/datahandler/products_data_handler');

router.route('/')
    .get((req, res) => {
        dataHandler.getProducts(req, res);
    });

router.route('/:id')
    .get((req, res) => {
        if(req.params.id.includes('?')) {
            dataHandler.searchProducts(req, res);
        } else {
            dataHandler.getProduct(req, res);
        }
    });

module.exports = router;