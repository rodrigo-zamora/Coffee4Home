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
        required: true,
        unique: false,
        index: true,

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
        required: false
    },
    stock: {
        type: Number,
        required: true
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
