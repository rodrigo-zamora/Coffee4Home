// conectarse a la instancia local de MongoDB a traves de mongoose
const mongoose = require('mongoose');

let mongoDB = 'mongo://localhost:27017/UsersDB';
mongoose.connect(mongoDB, { useNewUrlParser: true });

// Creamos el modelo de Usuario con un esquema especifico usando mongoose
let userSchema = mongoose.Schema({
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
    date: {
        type: Date,
        required: true
    },
    sex: {
        type: String,
        enum: ["H", "M"],
        required: true
    },
    image: String,
    role: {
        type: String,
        enum: ['ADMIN', 'USER', 'GUEST'],
        required: true
    },
});

let User = mongoose.model('User', userSchema);

// Creamos un nuevo usuario
let newUser = {
    firstName: 'Juan',
    lastName: 'Perez',
    email: 'juan.perez@iteso.mx',
    password: '12345',
    date: 1999-09-11,
    sex: 'H',
    image: 'https://randomuser.me/api/portraits/men/62.jpg',
    role: 'USER'
}

let user = User(newUser);
// guardamos el usuario
user.save().then(doc => console.log(doc));

/**
 * Buscar Documentos
 */
// Todos los documentos de la colección
User.find({}, (err, docs) => {console.log(docs)})

// Todos los documentos cuyo sexo sea 'H'
let sex = 'H';
User.find({'sex': new RegExp(sex, 'i')}, (err, docs) => {console.log(docs)});

// Documento con ID específico
let id = '234567896gdfgsfcxzc6576';
User.findById(id, (err, docs) => {console.log(docs)});

// Actualizar documentos
User.findOneAndUpdate({'firstName': 'Juan'}, {'firstName': 'Lupito'}, {new: true})
    .then(doc => console.log(doc))
    .catch(err => console.log(err));

User.findByIdAndUpdate('234567896gdfgsfcxzc6576', {'firstName': 'Lupito'}, (err, docs) => {console.log(docs)});
// Eliminar documentos

User.findOneAndDelete({'firstName': 'Juan'}, (err, docs) => {console.log(docs)});
