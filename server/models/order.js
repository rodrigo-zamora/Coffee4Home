"use strict";

// Conectarse a la instalcia local de MongoDB a traves de Mongoose
/*const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let MongoDB = 'mongodb://localhost:27017/OrdersDB';
let privateKey = process.env.TOKEN_KEY;
*/

/*
// Conectarse a la instalcia local de MongoDB a traves de Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let MongoDB = 'mongodb://127.0.0.1:27017/Coffe4Home';
let privateKey = process.env.TOKEN_KEY;

let Utils = require('../controllers/utils');

mongoose.connect(MongoDB, { useNewUrlParser: true });
*/

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
        required: true
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
        productId: {
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
});

