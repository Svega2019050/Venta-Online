"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    quantity_sold: { type: Number, default: 0 },
});

module.exports = mongoose.model("product", productSchema);