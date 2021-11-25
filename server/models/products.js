const mongoose = require('mongoose');

let Utils = require('../controllers/utils/uuid_utils');

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
    },
    tipoCafe: {
        type: String,
        required: true
    },
    tipoGrano: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
}, { collection : 'products' });

let Product = mongoose.model('product', productSchema);

module.exports = Product;
