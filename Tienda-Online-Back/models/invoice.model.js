'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var invoiceSchema = Schema({
  total: Number,
  createdAt: { type: Date, default: new Date() },
  cart: { type: Schema.ObjectId, ref: 'cart' },
  user: { type: Schema.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('invoice', invoiceSchema);
