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

module.exports = router;