"use strict";

const express = require("express");
const router = express.Router();

const adminOrderRouter = require("./admin_orders");
const adminUserRouter = require("./admin_users");

router.use("/orders", adminOrderRouter);
router.use("/users", adminUserRouter);

module.exports = router;