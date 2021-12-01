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
    let token = localStorage.getItem("token");
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

exports.verifyToken = verifyToken;