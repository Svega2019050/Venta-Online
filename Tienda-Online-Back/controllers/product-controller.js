'use strict';

const Category = require('./../models/category.model');
const Product = require('./../models/product-model');

function setProduct(req, res) {
  let product = new Product();
  let idCategory = req.params.idC;
  let params = req.body;

  if (!idCategory) {
      return res.status(400).send({ message: "Ingrese el idCategoria" });
  } else {
      Category.findById(idCategory, (err, categoryFound) => {
          if (err) {
              return res.status(500).send({ message: "Error general" });
          } else if (categoryFound) {
              if (params.name && params.price && params.stock) {
                  Product.findOne({name: params.name.toLowerCase()},(err,productCopy)=>{
                      if (err) {
                          return res.status(500).send({message: 'Error General',err});
                      }else if(productCopy) {
                          return res.status(401).send({message: 'Nombre de Producto ya existente'})
                      } else {
                          product.name = params.name.toLowerCase();
                          product.description = params.description;
                          product.price = params.price;
                          product.stock = params.stock;
      
                          product.save((err,productSave)=>{
                              if (err) {
                                  return res.status(500).send({message: 'Error General',err});
                              }else if(productSave) {
                                  Category.findByIdAndUpdate(idCategory,{$push:{product: productSave}},{new: true},(err,productPush)=>{
                                      if (err) {
                                          return res.status(500).send({message: 'Error General',err});
                                      }else if(productPush) {
                                          return res.send({message: 'Producto Guardado Con Exito',productPush});
                                      } else {
                                          return res.status(403).send({message: 'Erro al guardar Producto'});
                                      }
                                  }).populate('product');
                              } else {
                                  return res.status(403).send({message: 'Erro al guardar Producto'});
                              }
                          });
                      }
                  })
              } else {
                  return res
                      .status(400)
                      .send({ message: "Ingrese todos los datos del producto" });
              }
          } else {
              return res.status(404).send({ message: "Categoria no existe" });
          }
      });
  }
}

function getProduct(req, res) {
  let idProduct = req.params.idP;

  if (!idProduct) {
      return res.status(400).send({ message: "Ingrese el codigo del producto" });
  } else {
      Product.findById(idProduct, (err, productFound) => {
          if (err) {
              return res.status(500).send({ message: "Error general" });
          } else if (productFound) {
              return res.send({ message: "Producto encontrado", productFound });
          } else {
              return res.status(404).send({ message: "Producto no encontrado" });
          }
      });
  }
}

function getProducts(req, res) {
  Product.find({}).exec((err, products) => {
      if (err) {
          return res.status(500).send({ message: "Error general" });
      } else if (products) {
          return res.send({ message: "Producto encontrado", products });
      } else {
          return res.status(404).send({ message: "Producto no encontrado" });
      }
  });
}

function updateProduct(req, res) {
  let idCategory = req.params.idC;
  let idProduct = req.params.idP;

  let update = req.body;

  if (!idCategory && !idProduct) {
      return res
          .status(400)
          .send({ message: "Ingrese el idCategory y el idProduct" });
  } else {
      Product.findOne({name:update.name},(err,productDetect)=>{
          if (err) {
              return res.status(500).send({message: 'Error General',err});
          }else if(productDetect) {
              update.name = update.name.toLowerCase();
              if (productDetect._id == idProduct) {
                  Product.findById(idProduct,(err,productFind)=>{
                      if (err) {
                          return res.status(500).send({message: 'Error General',err});
                      }else if(productFind) {
                          Category.findOne({_id:idCategory, product: idProduct},(err,categoryFind)=>{
                              if (err) {
                                  return res.status(500).send({message: 'Error General',err});
                              }else if(categoryFind) {
                                  Product.findByIdAndUpdate(idProduct, update,{new: true},(err,productPush)=>{
                                      if (err) {
                                          return res.status(500).send({message: 'Error General',err});
                                      }else if(productPush) {
                                          return res.send({ message: 'Producto Actualizado Correctamente', productPush }); 
                                      } else {
                                          return res.send({ message: 'No se pudo actualizar la Producto' }); 
                                      }
                                  })
                              } else {
                                  
                              }
                          })
                      } else {
                          
                      }
                  })
              } else {
                  return res.status(404).send({message: 'Nombre De Producto ya existente'});
              }
          } else {
              update.name = update.name.toLowerCase();
              Product.findById(idProduct,(err,productFind)=>{
                  if (err) {
                      return res.status(500).send({message: 'Error General',err});
                  }else if(productFind) {
                      Category.findOne({_id:idCategory, product: idProduct},(err,categoryFind)=>{
                          if (err) {
                              return res.status(500).send({message: 'Error General',err});
                          }else if(categoryFind) {
                              Product.findByIdAndUpdate(idProduct, update,{new: true},(err,productPush)=>{
                                  if (err) {
                                      return res.status(500).send({message: 'Error General',err});
                                  }else if(productPush) {
                                      return res.send({ message: 'Producto Actualizado Correctamente', productPush }); 
                                  } else {
                                      return res.send({ message: 'No se pudo actualizar la Producto' }); 
                                  }
                              })
                          } else {
                              return res.send({ message: 'No se pudo actualizar la Producto' }); 
                          }
                      })
                  } else {
                      return res.send({ message: 'Producto Inexistente' }); 
                  }
              })
          }
      })

  }
}

function updateStockProduct(req, res) {
  let idCategory = req.params.idC;
  let idProduct = req.params.idP;

  let updateStock = req.body;

  if (!idCategory && !idProduct) {
      return res
          .status(400)
          .send({ message: "Ingrese el idCategory y el idProduct" });
  } else {
      Category.findOne({ _id: idCategory, productsId: idProduct },
          (err, productFound) => {
              if (err) {
                  return res.status(500).send({ message: "Error general" });
              } else if (productFound) {
                  if (!updateStock.stock) {
                      return res
                          .status(403)
                          .send({ message: "Por favor, ingrese el stock" });
                  } else {
                      Product.findByIdAndUpdate(
                          idProduct, {
                              stock: updateStock.stock,
                          }, { new: true },
                          (err, stockUpdated) => {
                              if (err) {
                                  return res
                                      .status(500)
                                      .send({ message: "Error general actualizando el stock" });
                              } else if (stockUpdated) {
                                  return res.send({
                                      message: "Stock actualizado",
                                      stockUpdated,
                                  });
                              } else {
                                  return res
                                      .status(403)
                                      .send({ message: "No se pudo actualizar el stock" });
                              }
                          }
                      );
                  }
              } else {
                  return res.status(404).send({ message: "No existe el producto" });
              }
          }
      );
  }
}

function removeProduct(req, res) {
  let idCategory = req.params.idC;
  let idProduct = req.params.idP;

  if (!idCategory && !idProduct) {
      return res
          .status(400)
          .send({ message: "Ingrese el idCategory y el idProduct" });
  } else {
      Category.findByIdAndUpdate({_id:idCategory, product:idProduct},
          {$pull: {product:idProduct}},{new: true},(err,productPull)=>{
              if (err) {
                  return res.status(500).send({message: 'Error General',err});
              }else if(productPull) {
                  Product.findOne({_id: idProduct},(err, productFind)=>{
                      if (err) {
                          return res.status(500).send({message: 'Error General',err});
                      }else if(productFind) {
                          Product.findByIdAndRemove(idProduct,(err,productRemove)=>{
                              if (err) {
                                  return res.status(500).send({message: 'Error General',err});
                              }else if(productRemove) {
                                  return res.send({message: 'Producto Eliminado Correctamente',productRemove});
                              } else {
                                  return res.status(404).send({message: 'No se puedo Eliminar Producto'});

                              }
                          })
                      } else {
                          return res.status(403).send({message: 'Producto no encontrada'});
                      }
                  })
              } else {
                  return res.status(403).send({ message: 'No se pudo Eliminar' });
              }
      })
  }
}
module.exports = {
  setProduct,
  getProduct,
  getProducts,
  updateProduct,
  updateStockProduct,
  removeProduct,
};