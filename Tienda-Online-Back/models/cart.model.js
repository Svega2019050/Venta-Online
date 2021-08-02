'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartSchema = Schema({
  products: [
    {
      productId: Schema.ObjectId,
      name: String,
      price: Number,
      cuantity: Number,
    },
  ],
  total: Number,
  createdAt: { type: Date, default: new Date() },
  active: { type: Boolean, default: true },
  user: { type: Schema.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('cart', cartSchema);
