"use strict";

const Order = require("../../models/order");

function getAllOrders(req, res) {
    Order.find({}, (err, orders) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to get orders"
            });
        }
        return res.json(orders);
    });
}

function getOrderByUUID(req, res) {
    Order.findOne({
        uuid: req.params.uuid
    }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: "Order not found"
            });
        }
        return res.json(order);
    }).select("-__v");
}

function createOrder(req, res) {
    let order = req.body;
    try {
        Order.findOne({
            uuid: order.uuid
        }, (err, existingOrder) => {
            if (err) {
                return res.status(400).send(err);
            }
            if (existingOrder) {
                return res.status(400).send("Order already exists");
            }
            let newOrder = new Order(order);
            newOrder.save((err, order) => {
                if (err) {
                    return res.status(400).send(err);
                }
                return res.status(200).send("Order created!");
            });
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

function updateOrder(req, res) {
    Order.findOneAndUpdate({
        uuid: req.params.uuid
    }, req.body, {
        new: true
    }, (err, order) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send("Order updated successfully");
    });
}

function deleteOrder(req, res) {
    Order.findOneAndRemove({
        uuid: req.params.uuid
    }, (err, order) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send("Order deleted successfully");
    });
}

exports.getAllOrders = getAllOrders;
exports.getOrderByUUID = getOrderByUUID;
exports.createOrder = createOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;