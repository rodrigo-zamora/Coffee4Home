"use strict";

const User = require('../../models/user')

function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    
    User.findOne({ email: `${email}` })
        .then(user => {
            let token = user.generateToken(password);
            console.log(token)
            if (token != undefined) {
                res.status(200)
                res.set('Content-Type', 'text/plain; charset=utf-8');
                res.send(token);
            } else {
                res.status(404);            
                res.set('Content-Type', 'text/plain; charset=utf-8');
                res.send(`Wrong email or password`);
            }
        })
        .catch(err => {
            res.status(404);            
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.send(`Wrong email or password`);
        });
}

function getUsers(req, res) {
    User.find().then(users => res.status(200).json(users));
}

function getUserByUUID(UUID) {
    return User.findOne({ UUID: `${UUID}` });
}

function getUserByEmail(req, res) {
    let email = req.params.email;
    User.findOne({ email: `${email}` })
        .then(user => {
            if (user == undefined) {
                res.status(404).type('text/plain')
                .send(`User with email ${email} was NOT found!`);
            } else{
                res.status(200).json(user);
            }
        })
}

function createUser(req, res) {
    let user = req.body;
    try {
        User.findOne({ email: `${user.email}` }).then(newUser => {
            if (newUser == undefined) {
                User.create(user).then(user => {
                    res.type('text/plain; charset=utf-8');
                    res.send(`User ${user.email} was created!`);
                });
            } else {
                res.type('text/plain; charset=utf-8');
                res.send(`User with email ${user.email} already exists!`);
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

function updateUser(req, res) {
    let email = req.params.email;
    let updatedUser = req.body;

    for (let property in updatedUser) {
        if (['firstName', 'lastName', 'password', 'date', 'sex', 'image'].includes(property)) continue;
        delete updatedUser[property];
    }

    User.findOneAndUpdate({ email: `${email}` }, updatedUser, { new : true }).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(`User ${user.firstName} was updated!`);
    });
}

function deleteUser(req, res) {
    let email = req.params.email;

    User.findOneAndDelete({ email: `${email}` }).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(user != undefined ? `User with email ${email} has been deleted!` : `No user with email ${email} was found!`);
    });
}

exports.login = login;
exports.getUsers = getUsers;
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
