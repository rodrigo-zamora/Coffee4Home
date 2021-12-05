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
    // UUID is the uuid of the user
    // Search all orders for the user with the given UUID
    console.log(req.params.uuid);
    if (req.headers.isorder == undefined) {
        console.log("Searching by userUUID")
        Order.find({
            userUUID: req.params.uuid
        }, (err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to get orders"
                });
            }
            return res.json(orders);
        });
    } else {
        console.log("Searching by orderUUID");
        Order.find({
            orderUUID: req.params.uuid
        }, (err, orders) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.json(orders);
        });
    }
    
}

function createOrder(req, res) {
    let order = req.body;
    console.log(order);
   /*  try {
        Order.findOne({
            uuid: order.uuid
        }, (err, existingOrder) => {
            if (err) {
                return res.status(400).send(err);
            }
            if (existingOrder) {
                return res.status(400).send("Order already exists");
            } */
            let newOrder = new Order(order);
            newOrder.save((err, order) => {
                if (err) {
                    return res.status(400).send(err);
                }
                return res.status(200).send("Order created!");
            });
        /* });
    } catch (err) {
        res.status(400).json(err);
    } */
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