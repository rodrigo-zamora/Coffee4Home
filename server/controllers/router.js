"use strict";

const router = require('express').Router();

const ordersRouter = require('../routes/orders');
const userRouter = require('../routes/users');
const adminRouter = require('../routes/admin/admin_router');
const productRouter = require('../routes/products');

const tokenUtils = require('./utils/token_utils');

router.route('/:email', tokenUtils.verifyToken);

<<<<<<< HEAD
<<<<<<< HEAD
//router.use('/orders', ordersRouter, " ? uuid = req.params.uuid ");
router.use('/orders', ordersRouter);

router.use('/users', userRouter);
//router.use('/users', tokenUtils);
router.use('/products', productRouter);

//router.use('/admin', adminRouter, " ? uuid = req.params.uuid ");
=======
router.use('/orders', ordersRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
>>>>>>> parent of 2ec8f91 (Patch login (#73))
router.use('/admin', adminRouter);
=======
router.use('/orders', ordersRouter, " ? uuid = req.params.uuid ");
//router.use('/users', userRouter);
//router.use('/users', tokenUtils);
router.use('/products', productRouter);
router.use('/admin', adminRouter, " ? uuid = req.params.uuid ");
>>>>>>> parent of 04324f9 (Changes for Login (#76))

module.exports = router;