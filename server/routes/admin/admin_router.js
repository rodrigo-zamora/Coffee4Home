"use strict";

const express = require("express");
const router = express.Router();

const adminOrderRouter = require("./admin_order");
const adminUserRouter = require("./admin_user");
const adminProductRouter = require("./admin_product");
const users = require('../../controllers/datahandler/users_data_handler');

router.use("/orders", validateAdmin, adminOrderRouter);
router.use("/users", validateAdmin, adminUserRouter);
router.use("/products", validateAdmin, adminProductRouter);

// console.log("A"+'query');

function validateAdmin(req, res, next) {
    const auth = req.header('x-auth');
    if (!auth) {
        return res.status(403).type("text/plain")
            .send("Unauthorized access, no admin privileges");
    }
    else {
        const admin = req.get('x-auth');
        if (admin != 'admin') {
            return res.status(403).type("text/plain")
                .send("Unauthorized access, no admin privileges");
        }
        try {
            next();
        } catch (e) {
            return res.status(400).send(e.errorMessage);
        }
    }
}

function validateAdminUser(req, res, next) {
    if(req.params.id.includes('?')) {
        req.params.id = req.params.id.split('?')[0];
        console.log('query');
        const user = users.getUserByEmail(req, res);
        console.log(user);
        if (user.role != 'ADMIN') {
            res.status(403).send("Not authorized");
        }
        else {
            next();
        }
    }
    else {
        console.log('no query');
    }
}


module.exports = router;