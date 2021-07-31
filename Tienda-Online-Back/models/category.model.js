'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var categorySchema = Schema ({
    nameCategory: String,
    description: String,
    imageCategory: String,
    product:[{type: Schema.ObjectId, ref: 'product'}]
});

module.exports = mongoose.model('category',categorySchema);