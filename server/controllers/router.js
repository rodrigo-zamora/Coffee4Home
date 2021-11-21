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

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/admin', adminUserRouter);

module.exports = router;