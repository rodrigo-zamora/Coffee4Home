const mongoose = require('mongoose');

let Utils = require('../controllers/utils/uuid_utils');

let productSchema = new mongoose.Schema({
    UUID: {
        type: String,
        default: function () {
            return Utils.generateUUID();
        },
        unique: true,
        required: false,
        index: true
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
    cafeLocal: {
        type: String,
        required: true
    }
}, { collection : 'products' });

let Product = mongoose.model('product', productSchema);

productSchema.pre('save', function (next) {
    let product = this;
    product.UUID = Utils.generateUUID();
    next();
});

module.exports = Product;
