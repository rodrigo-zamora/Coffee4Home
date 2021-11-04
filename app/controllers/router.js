"use strict";

const express = require('express');
const router = express.Router();
const userRouter = require('../routes/user');
const adminProductRouter = require('../routes/admin_user');
const productRouter = require('../routes/products');

router.get('/', (req, res) => {
    res.redirect('/home')
});

router.use('/user', userRouter);
router.use('/products', productRouter);
router.use('/admin/user', validateAdmin, adminProductRouter);

function validateAdmin(req, res, next) {
    const auth = req.header('x-auth');
    if (auth !== 'admin') {
        res.status(403).send('Unauthorized access, no admin privileges');
    } else {
        const admin  = req.get('x-auth');   
        if (admin != 'admin') {
            res.status(403).send('Unauthorized access, no admin privileges');
        }
        try {
            next();
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = router;