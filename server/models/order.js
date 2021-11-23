// Conectarse a la instalcia local de MongoDB a traves de Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let Utils = require('../controllers/utils');

let orderSchema = new mongoose.Schema({
    orderUUID: {
        type: String,
        required: false,
        unique: true,
        index: true,
        default: Utils.generateOrderUUID()
    },
    userUUID: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: false,
        default: Date.now
    },
    orderStatus: { 
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELLED'],
        required: true
    },
    orderTotal: {
        type: Number,
        required: true
    },
    orderItems: [{
        productUUID: {
            type: String,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        productPrice: {
            type: Number,
            required: true
        },
        productQuantity: {
            type: Number,
            required: true
        },
        productTotal: {
            type: Number,
            required: true
        },
    }],
}, { collection : 'orders' });

let Order = mongoose.model('order', orderSchema);

module.exports = Order;