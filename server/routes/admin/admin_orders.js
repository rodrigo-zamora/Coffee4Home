"use strict";

const express = require("express");
const router = express.Router();
const dataHandler = require("../../controllers/datahandler/orders_data_handler");

router.route("/")
    .get((req, res) => {
        dataHandler.getAllOrders(req, res);
    })
    .post((req, res) => {
        dataHandler.createOrder(req, res);
    });

module.exports = router;