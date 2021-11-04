// Conectarse a la instalcia local de MongoDB a traves de Mongoose
const mongoose = require('mongoose');

let MongoDB = 'mongodb://localhost:27017/UsersDB';
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

let User = mongoose.model('User', userSchema);


