'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var userRoute = require('./routes/user.route');
var CategoryRoute = require('./routes/category.route');
var productRoute = require('./routes/product-routes');
var cartRoute = require('./routes/cart.route');
var invoiceRoute = require('./routes/invoice.route');


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/api',userRoute);
app.use('/api',CategoryRoute);
app.use('/api',productRoute);
app.use('/api',cartRoute);
app.use('/api',invoiceRoute);


module.exports = app;