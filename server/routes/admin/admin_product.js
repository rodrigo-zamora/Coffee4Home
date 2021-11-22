"use strict";

const express = require("express");
const router = express.Router();
const dataHandler = require("../../controllers/datahandler/products_data_handler");

router.route('/')
    .post((req, res) => {
        dataHandler.createProduct(req, res);
    });

router.route('/:uuid')
    .put((req, res) => {
        dataHandler.updateProduct(req, res);
    })
    .delete((req, res) => {
        dataHandler.removeProduct(req, res);
    });;

module.exports = router;