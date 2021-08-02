'use strict'

const express = require('express');
const categoryController = require('../controllers/category.controller')
const mdAuth = require('../middlewares/authenticated');

var  api = express.Router();

api.put('/:userId/saveCategory', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],categoryController.saveCategory);
api.put('/:userId/deleteCategory/:categoryId', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],categoryController.deleteCategory);  
api.put('/:userId/updateCategory/:categoryId', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],categoryController.updateCategory);  

api.get('/getCategory',categoryController.getCategory);
api.get('/:userId/getCategoryId/:categoryId', [mdAuth.ensureAuth],categoryController.getCategoryId);

module.exports = api;