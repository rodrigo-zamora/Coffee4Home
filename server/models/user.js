// Conectarse a la instalcia local de MongoDB a traves de Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let MongoDB = 'mongodb://127.0.0.1:27017/Coffe4Home';
let privateKey = process.env.TOKEN_KEY;

let Utils = require('../controllers/utils');

mongoose.connect(MongoDB, { useNewUrlParser: true });

// Creamos el modelo de Usuario con un esquema específico usando Mongoose
let userSchema = mongoose.Schema({
    UUID: {
        type: String,
        required: false,
        unique: true,
        index: true,
        default: Utils.generateUUID()
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER', 'GUEST'],
        required: true
    },
}, { collection : 'users' });

userSchema.pre('save', function (next) {
    let user = this;
    user.password = bcrypt.hashSync(user.password, 10);
    next();
});

let User = mongoose.model('user', userSchema);

module.exports = User;