"use strict";

process.env.TOKEN_KEY = "secret";

const express = require('express');
const router = require('./server/controllers/router');
const loginRouter = require('./server/controllers/login_router');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Coffe4Home', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Conectado a MongoDB');
});

const app = express();
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 8080;

app.use(cors(
    {
        origin: ['http://127.0.0.1:5500']
    }
));

app.set('views', path.join(__dirname, '/app/views'));
app.use(express.static(path.join(__dirname, '/app/public')));

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

app.get('/search', (req, res) => {
    res.render('searchProducts'); 
});

app.get('/products', (req, res) => {
    res.render('searchProducts');
});

app.get('/cart', (req, res) => {    
    res.render('shoppingCart');
});

app.get('/shoppingCart', (req, res) => {
    res.render('shoppingCart');
 });

/*app.get('/orders', (req, res) => {
    res.render('orders');
});

app.get('*', function(req, res){
    res.render('404');
  });*/

app.listen(port, () => {
    console.log(`Coffe4Home app listening on port ${port}`);
});