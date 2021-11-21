"use strict";

const router = require('express').Router();
const dataHandler = require('./datahandler/users_data_handler');

const ordersRouter = require('../routes/orders');
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

router.use('/orders', ordersRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/admin', adminUserRouter);

module.exports = router;