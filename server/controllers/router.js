"use strict";

const router = require('express').Router();
const dataHandler = require('./data_handler');

const userRouter = require('../routes/users');
const adminUserRouter = require('../routes/admin_user');
const productRouter = require('../routes/products');

const tokenUtils = require('../controllers/token_utils');

router.route('/')
    .get((req, res) => {
        dataHandler.getUsers(req, res);
    })
    .post((req, res) => {
        dataHandler.createUser(req, res);
    });

router.route('/:email', tokenUtils.verifyToken);

router.route('/:email')
    .get((req, res) => {
        dataHandler.getUserByEmail(req, res);
    })
    .put((req, res) => {
        dataHandler.updateUser(req, res);
    })
    .delete((req, res) => {
        dataHandler.deleteUser(req, res);
    });

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/admin', adminUserRouter);

module.exports = router;