"use strict";

const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Coffe4Home');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});