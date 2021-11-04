"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/data_handler');

router.route('/user/')
    .post((req, res) => {
        let user = req.body;
        try {
            user = dataHandler.createUser(user);
        } catch (e) {
            return res.status(400).send(e.errorMessage);
        }
        if (user != undefined) {
            res.status(201).type('text/plain; charset=utf-8')
                .send(`User ${user.firstName} with uuid ${user.uuid} was created!`);
        } else {
            res.status(400).type('text/plain')
                .send(`User with uuid ${user.uuid} was NOT created!`);
        }
    });

router.route('/user/:uuid')
    .get((req, res) => {
        let uuid = req.params.uuid;
        let user = dataHandler.getUserByUUID(uuid);
        if (user == undefined) {
            res.status(404).type('text/plain')
                .send(`User with uuid ${uuid} was NOT found!`);
        } else {
            res.status(200).type('application/json')
                .send(user);
        }
    })
    .put((req, res) => {
        let uuid = req.params.uuid;
        let user = dataHandler.getUserByUUID(uuid);
        if (user == undefined) {
            res.status(404).type('text/plain')
                .send(`User with uuid ${uuid} was NOT found!`);
        } else {
            let updatedUser = req.body;
            try {
                updatedUser = dataHandler.updateUser(uuid, updatedUser);
            } catch (e) {
                return res.status(400).send(e.errorMessage);
            }
            if (updatedUser != undefined) {
                res.status(200).type('text/plain; charset=utf-8')
                    .send(`User ${updatedUser.firstName} with uuid ${updatedUser.uuid} was updated!`);
            } else {
                res.status(400).type('text/plain') 
                    .send(`User with uuid ${uuid} was NOT updated!`);
            }
        }
    })
    .delete((req, res) => {
        let uuid = req.params.uuid;
        let user = dataHandler.getUserByUUID(uuid);
        if (user == undefined) {
            res.status(404).type('text/plain')
                .send(`User with uuid ${uuid} was NOT found!`);
        } else {
            try {
                dataHandler.deleteUser(uuid);
            } catch (e) {
                return res.status(400).send(e.errorMessage);
            }
            res.status(200).type('text/plain; charset=utf-8')
                .send(`User ${user.firstName} with uuid ${uuid} was deleted!`);
        }
    });

router.route('/product/:uuid')
    .get((req, res) => {
        let uuid = req.params.uuid;
        let product = dataHandler.getProductByUUID(uuid);
        if (product == undefined) {
            res.status(404).type('text/plain')
                .send(`Product with uuid ${uuid} was NOT found!`);
        } else {
            res.status(200).type('application/json')
                .send(product);
        }
    })
    .put((req, res) => {
        let uuid = req.params.uuid;
        let product = dataHandler.getProductByUUID(uuid);
        if (product == undefined) {
            res.status(404).type('text/plain')
                .send(`Product with uuid ${uuid} was NOT found!`);
        } else {
            let updatedProduct = req.body;
            try {
                updatedProduct = dataHandler.updateProduct(uuid, updatedProduct);
            } catch (e) {
                return res.status(400).send(e.errorMessage);
            }
            if (updatedProduct != undefined) {
                res.status(200).type('text/plain; charset=utf-8')
                    .send(`Product ${updatedProduct.title} with uuid ${updatedProduct.uuid} was updated!`);
            } else {
                res.status(400).type('text/plain') 
                    .send(`Product with uuid ${uuid} was NOT updated!`);
            }
        }
    })
    .delete((req, res) => {
        let uuid = req.params.uuid;
        let product = dataHandler.getProductByUUID(uuid);
        if (product == undefined) {
            res.status(404).type('text/plain')
                .send(`Product with uuid ${uuid} was NOT found!`);
        } else {
            try {
                dataHandler.deleteProduct(uuid);
            } catch (e) {
                return res.status(400).send(e.errorMessage);
            }
            res.status(200).type('text/plain; charset=utf-8')
                .send(`Product ${product.title} with uuid ${uuid} was deleted!`);
        }
    });

module.exports = router;