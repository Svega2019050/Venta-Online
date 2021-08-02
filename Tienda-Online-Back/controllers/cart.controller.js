'use strict';

const productModel = require('../models/product-model');
const cartModel = require('../models/cart.model');
const invoiceModel = require('../models/invoice.model');

/* Add Product */
async function addProduct(req, res) {
  let userId = req.user.sub;
  let productId = req.params.productId;

  try {
    const product = await productModel.findById(productId);
    const cart = await cartModel.findOne({
      createdAt: { $lte: new Date() },
      active: true,
      user: userId,
    });

    if (!product) {
      return res.status(404).send({ message: 'El producto no existe' });
    }
    if (product.stock < 1) {
      return res
        .status(400)
        .send({ message: 'No hay stock suficiente del producto' });
    }
    if (!cart) {
      if (product.stock < 1) {
        return res
          .status(400)
          .send({ message: 'No hay stock suficiente del producto' });
      }
      const cartToInsert = new cartModel({
        user: userId,
        total: product.price,
        products: [
          {
            productId,
            cuantity: 1,
            price: product.price,
            name: product.name,
          },
        ],
      });

      await cartToInsert.save();
      return res.status(200).send(cartToInsert);
    }

    const productIndex = cart.products.findIndex(
      (productFinded) => productFinded.productId == product.id
    );

    if (productIndex != -1) {
      if (product.stock < cart.products[productIndex].cuantity + 1) {
        return res
          .status(400)
          .send({ message: 'No hay stock suficiente del producto' });
      }
      await cartModel.updateOne(
        { _id: cart._id, 'products.productId': productId },
        { $inc: { total: product.price, 'products.$.cuantity': 1 } },
        { new: true }
      );
    } else {
      if (product.stock < 1) {
        return res
          .status(400)
          .send({ message: 'No hay stock suficiente del producto' });
      }
      await cartModel.updateOne(
        { _id: cart._id },
        {
          $push: {
            products: {
              productId,
              cuantity: 1,
              price: product.price,
              name: product.name,
            },
          },
          $inc: { total: product.price },
        },
        { new: true }
      );
    }

    const cartUpdated = await cartModel.findById(cart._id);
    return res.status(200).send(cartUpdated);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

async function getCart(req, res) {
  let userId = req.user.sub;

  try {
    const cart = await cartModel.findOne({
      createdAt: { $lte: new Date() },
      active: true,
      user: userId,
    });

    if (!cart) {
      return res
        .status(404)
        .send({ message: 'Aún no ha añadido items a su carrito' });
    }

    return res.send(cart);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

/* Buy Cart */
async function buyCart(req, res) {
  let userId = req.user.sub;

  try {
    const cart = await cartModel.findOne({
      createdAt: { $lte: new Date() },
      active: true,
      user: userId,
    });

    if (!cart) {
      return res
        .status(404)
        .send({ message: 'Aún no ha añadido items a su carrito' });
    }

    for (const product of cart.products) {
      await productModel.updateOne(
        { _id: product.productId },
        { $inc: { stock: -1 * product.cuantity } }
      );
    }

    const cartUpdated = await cartModel.findByIdAndUpdate(
      cart._id,
      {
        $set: { active: false },
      },
      { new: true }
    );

    const invoice = new invoiceModel({
      total: cart.total,
      cart: cart._id,
      user: cart.user,
    });

    await invoice.save();

    return res.status(200).send({ cart: cartUpdated, invoice });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

/* Export */

module.exports = {
  addProduct,
  getCart,
  buyCart,
};
