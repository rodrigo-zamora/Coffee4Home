"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/data_handler');

router.route('/:id')
    .get((req, res) => {
        let query = req.params.id;
        let user = dataHandler.getUserByUUID(query);
        if(user == undefined) {
                res.status(404).type('text/plain')
                .send(`User with uuid ${query} was NOT found!`);
        } else{
            res.status(200).json(user);
        } 
    });

module.exports = router;