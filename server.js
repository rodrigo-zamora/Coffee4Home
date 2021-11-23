"use strict";

process.env.TOKEN_KEY = "secret";

const express = require('express');
const router = require('./server/controllers/router');
const loginRouter = require('./server/controllers/login_router');

const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const cors = require('cors');

app.use(cors(
    {
        origin: ['http://127.0.0.1:5500']
    }
));

app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.json());
app.use(loginRouter);
app.use(router);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/orders', (req, res) => {
    res.render('orders');
});

app.get('/products', (req, res) => {
    res.render('products');
});

app.get('/cart', (req, res) => {
    res.render('cart');
    });

app.get('*', function(req, res){
    res.render('404');
  });

app.listen(port, () => {
    console.log(`Coffe4Home app listening on port ${port}`);
});