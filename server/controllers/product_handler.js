"use strict";

const Product = require('../models/order');

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