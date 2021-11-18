"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../../server/controllers/data_handler');

router.route('/')
    .get((req, res) => {
        let query = req.query.query;
        if (query == undefined) {
            res.status(200).json(dataHandler.getProduct());
        } 
        else {
            let products = dataHandler.findProduct(query);
            if(products.length == 0) {
                res.status(404).type('text/plain')
                .send(`Product with query ${query} was NOT found!`);
            } else{
                res.status(200).json(products);
            } 
        }
    });

router.route('/:id')
    .get((req, res) => {
        let query = req.params.id;
        let product = dataHandler.getProductsByUUID(query);
        if(product == undefined) {
                res.status(404).type('text/plain')
                .send(`Product with uuid ${query} was NOT found!`);
        } else{
            res.status(200).json(product);
        } 
    });

module.exports = router;