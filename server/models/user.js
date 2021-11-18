// Conectarse a la instalcia local de MongoDB a traves de Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let MongoDB = 'mongodb://127.0.0.1:27017/Coffe4Home';
let privateKey = process.env.TOKEN_KEY;

mongoose.connect(MongoDB, { useNewUrlParser: true });

// Creamos el modelo de Usuario con un esquema específico usando Mongoose
let userSchema = mongoose.Schema({
    UUID: {
        type: String,
        required: true
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
});

userSchema.pre('save', function (next) {
    let user = this;
    user.password = bcrypt.hashSync(user.password, 10);
    next();
});

userSchema.methods.generateAuthToken = function (password) {
    let user = this;
    let payload = {
        _id: user._id,
        role: user.role
    };
    let options = {
        expiresIn: 60 * 60
    };

    if (bcrypt.compareSync(password, user.password)) {
        try {
            jwt.sign(payload, privateKey, options);
        }
        catch (error) {
            console.log(error);
        }
    }
};

let User = mongoose.model('User', userSchema);

module.exports = User;