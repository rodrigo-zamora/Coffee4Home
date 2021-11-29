"use strict";

const router = require('express').Router();

const ordersRouter = require('../routes/orders');
const userRouter = require('../routes/users');
const adminRouter = require('../routes/admin/admin_router');
const productRouter = require('../routes/products');
const login = require('./login_router');

const tokenUtils = require('./utils/token_utils');

router.use('/:email', tokenUtils.verifyToken);

router.use('/orders', ordersRouter);
router.use('/users', userRouter);
//router.use('/users', tokenUtils);
router.use('/products', productRouter);
router.use('/admin', adminRouter);

console.log(tokenUtils.verifyToken);

module.exports = router;