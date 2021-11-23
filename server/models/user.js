// Conectarse a la instalcia local de MongoDB a traves de Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let MongoDB = 'mongodb+srv://mongodb:znN7A9g27Cm6CPC@coffe4home.hyqw6.mongodb.net/Coffe4Home?retryWrites=true&w=majority';
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
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    zip: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
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