"use strict";

const express = require("express");
const mdAuth = require("./../middlewares/authenticated");
const productController = require("./../controllers/product-controller");

const api = express.Router();

api.put("/createProduct/:idC", [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],productController.setProduct);
api.post("/getProduct/:idP", [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],productController.getProduct);
api.get("/getProducts/", productController.getProducts);
api.put("/:idC/updateProduct/:idP", [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], productController.updateProduct);
api.put("/:idC/updateStockProduct/:idP", [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],productController.updateStockProduct);

api.put("/:idC/removeProduct/:idP", [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin],productController.removeProduct);

module.exports = api;