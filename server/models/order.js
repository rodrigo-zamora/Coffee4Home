// Conectarse a la instalcia local de MongoDB a traves de Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let Utils = require('../controllers/utils/uuid_utils');

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
        required: true,
        unique: false
    },
    orderDate: {
        type: Date,
        required: false,
        default: Date.now
    },
    orderStatus: { 
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELLED', 'REJECTED'],
        required: true
    },
    orderTotal: {
        type: Number,
        required: true
    },
    orderItems: [{
        UUID: {
            type: String,
            required: true,
            unique: false
        },
        quantity: {
            type: Number,
            required: true,
            unique: false
        }
    }]
}, { collection : 'orders' });

let Order = mongoose.model('order', orderSchema);

module.exports = Order;