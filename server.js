"use strict";

process.env.TOKEN_KEY = "secret";

const express = require('express');
const router = require('./server/controllers/router');
const loginRouter = require('./server/controllers/login_router');

const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

app.use(cors(
    {
        origin: ['http://127.0.0.1:5500']
    }
));
app.use(express.json());
app.use(loginRouter);
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.route('/home').get(
    (req, res) => {
        res.send('Home!');
    }
);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});