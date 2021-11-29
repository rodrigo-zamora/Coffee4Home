const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let Utils = require('../controllers/utils/uuid_utils');

// Creamos el modelo de Usuario con un esquema específico usando Mongoose
let userSchema = mongoose.Schema({
    UUID: {
        type: String,
        default: function () {
            return Utils.generateUUID();
        },
        unique: true,
        required: false,
        index: true
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
    user.UUID = Utils.generateUUID();
    next();
});

let User = mongoose.model('user', userSchema);

module.exports = User;