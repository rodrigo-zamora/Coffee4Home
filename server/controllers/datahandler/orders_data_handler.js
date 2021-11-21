"use strict";

const Order = require("../../models/order");

function getAllOrders(req, res) {
    Order.find({}, (err, orders) => {
        if (err) {
        return res.status(400).json({
            error: "Orders not found"
        });
        }
        return res.json(orders);
    }).select("-__v");
}

function getOrderByUUID(req, res) {
    Order.findOne({ uuid: req.params.uuid }, (err, order) => {
        if (err) {
        return res.status(400).json({
            error: "Order not found"
        });
        }
        return res.json(order);
    }).select("-__v");
}

function createOrder(req, res) {
    const order = new Order(req.body);
    order.save((err, order) => {
        if (err) {
        return res.status(400).json({
            error: "Failed to create new order"
        });
        }
        return res.json(order);
    });
}

function updateOrder(req, res) {
    Order.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true }, (err, order) => {
        if (err) {
        return res.status(400).json({
            error: "Failed to update order"
        });
        }
        return res.json(order);
    });
}

function deleteOrder(req, res) {
    Order.findOneAndRemove({ uuid: req.params.uuid }, (err, order) => {
        if (err) {
        return res.status(400).json({
            error: "Failed to delete order"
        });
        }
        return res.json({
            message: "Order deleted successfully"
        });
    });
}

exports.getAllOrders = getAllOrders;
exports.getOrderByUUID = getOrderByUUID;
exports.createOrder = createOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
