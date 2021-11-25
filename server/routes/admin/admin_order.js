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

router.route("/:uuid")
    .get((req, res) => {
        dataHandler.getOrderByUUID(req, res);
    })
    .delete((req, res) => {
        dataHandler.deleteOrder(req, res);
    })
    .post((req, res) => {
        dataHandler.updateOrder(req, res);
    });

module.exports = router;