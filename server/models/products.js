// Conectarse a la instalcia local de MongoDB a traves de Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let MongoDB = 'mongodb://127.0.0.1:27017/Coffe4Home';
let privateKey = process.env.TOKEN_KEY;

let Utils = require('../controllers/utils');

mongoose.connect(MongoDB, { useNewUrlParser: true });

let productSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: false,
        unique: true,
        index: true,
        default: Utils.generateUUID()
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false,
        default: Date.now
    }
}, { collection : 'products' });

let Product = mongoose.model('product', productSchema);

module.exports = Product;
