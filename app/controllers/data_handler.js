"use strict";

const User = require('./users');
const Product = require('./products');

function getUsers(req, res) {
    User.find({}).then(users => {
        res.status(200).json(users);
    });
}

function getUserByUUID(req, res) {
    let uuid = req.params.uuid;
    User.findOne({uuid: uuid}).then(user => {
        res.status(200).json(user);
    });
}

function createUser(user) {
    let user = User(req.body);

    user.save().then(user => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`User ${user.firstName} was created!`);
    });
}

function updateUser(UUID, updatedUser) {
    let uuid = req.params.uuid;
    let updatedUser = req.body;

    for (let property in updatedUser) {
        if (['firstName', 'lastName', 'password', 'email', 'imageURL'].includes(property)) continue;
        delete updatedUser[property];
    }

    User.findOneAndUpdate({uuid: uuid}, updatedUser, {new: true}).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(`User ${user.firstName} was updated!`);
    })
}

function deleteUser(uuid) {
    let uuid = req.params.uuid;
    User.findOneAndDelete({uuid: uuid}).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(`User ${user.firstName} was deleted!`);
    });
}

function isUserValid(firstName, lastName, email) {
    return (firstName && lastName && email);
}

function getProduct(req, res) {
    Product.find({}).then(products => {
        res.status(200).json(products);
    });
}

function getProductsByUUID(req, res) {
    let uuid = req.params.uuid;
    Product.findOne({uuid: uuid}).then(product => {
        res.status(200).json(product);
    });
}

function createProduct(product) {
    let product = Product(req.body);

    Product.save().then(product => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`User ${product.title} was created!`);
    });
}

/*function updateProduct(UUID, updatedProduct) {
    let uuid = req.params.uuid;
    let updatedProduct = req.body;

    for (let property in updatedProduct) {
        if (['title', 'description', 'imageURL', 'pricePerUnit', 'category'].includes(property)) continue;
        delete updatedProduct[property];
    }

    Product.findOneAndUpdate({uuid: uuid}, updatedProduct, {new: true}).then(product => {
        res.type('text/plain; charset=utf-8');
        res.send(`User ${product.title} was updated!`);
    })
}*/

function deleteProduct(uuid) {
    let uuid = req.params.uuid;
    Product.findOneAndDelete({uuid: uuid}).then(product => {
        res.type('text/plain; charset=utf-8');
        res.send(`User ${product.title} was deleted!`);
    });
}

function isProductValid(title, category) {
    return (title && category);
}

function findProduct(query) {
    let category = '', title = ''; let list = []; let product = {};
    if (query.includes(':')) {
        let main = query.split(':'); 
        category = main[0]; title = main[1].trim();
    }
    else {
        title = query;
    } 
    if (category && title == '') {
        for (let i of products){
            if (i.category.includes(category)) list.push(i);
        }
    }
    else if (!category && title) {
        for (let i of products){
            if (i.title.includes(title)) list.push(i);
        }
    }
    else if (category && title) {
        for (let i of products){
            if (i.category.includes(category)) {
                if (i.title.includes(title)) {
                    list.push(i);
                }
            }
            else if (i.title.includes(title)) {
                if (i.title.includes(title)) {
                    list.push(i);
                }
            }
        }
        let result = []; result = list.filter((v,i) => list.indexOf(v) === i);
    }
    return list;
}

