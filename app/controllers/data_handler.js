"use strict";

const User = require('./users');

function getUsers(req, res) {
    User.find({}).then(users => {
        res.status(200).json(users);
    });
}

function getUserByUUID(req, res) {
    let uuid = req.params.uuid;
    User.findOne({uuid: uuid}).then(user => {
        res.status(200).json(user);
    });
}

function createUser(user) {
    let user = User(req.body);

    user.save().then(user => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`User ${user.firstName} was created!`);
    });
}

function updateUser(UUID, updatedUser) {
    let uuid = req.params.uuid;
    let updatedUser = req.body;

    for (let property in updatedUser) {
        if (['firstName', 'lastName', 'password', 'email', 'imageURL'].includes(property)) continue;
        delete updatedUser[property];
    }

    User.findOneAndUpdate({uuid: uuid}, updatedUser, {new: true}).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(`User ${user.firstName} was updated!`);
    })
}

function deleteUser(uuid) {
    let uuid = req.params.uuid;
    User.findOneAndDelete({uuid: uuid}).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(`User ${user.firstName} was deleted!`);
    });
}

function isUserValid(firstName, lastName, email) {
    return (firstName && lastName && email);
}
    

