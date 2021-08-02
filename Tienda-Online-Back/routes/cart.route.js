'use strict';

const express = require('express');
const cartController = require('../controllers/cart.controller');
const mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/', [mdAuth.ensureAuth], cartController.getCart);
api.post('/buy', [mdAuth.ensureAuth], cartController.buyCart);
api.post('/:productId', [mdAuth.ensureAuth], cartController.addProduct);

module.exports = api;
