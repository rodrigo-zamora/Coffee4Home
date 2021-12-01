"use strict";

const jwt = require("jsonwebtoken");

let privateKey = process.env.TOKEN_KEY;

/* const verifyAdmin = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Invalid token"
                });
            } else {
                if (decoded.role === "admin") {
                    next();
                } else {
                    res.status(403).send({
                        message: "You are not authorized to perform this action"
                    });
                }
            }
        });
    } else {
        res.status(401).send({
            message: "No token provided"
        });
    }
}; */

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Invalid token"
                });
            } else {
                next();
            }
        });
    } else {
        res.status(401).send({
            message: "No token provided"
        });
    }
};

/* const verifyToken = (req, res, next) => {
    let token = req.get("x-auth");
    if (token == undefined) {
        return res.status(403).send("Missing token");
    }
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token");
        req.userInfo = decoded;
        return next();
    });
}; */

exports.verifyToken = verifyToken;
