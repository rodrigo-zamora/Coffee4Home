"use strict";

const Product = require("../../models/products");

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) {
      res.status(500).send({
        message: "Error en la petición"
      });
    } else {
      if (!products) {
        res.status(404).send({
          message: "No hay productos"
        });
      } else {
        res.status(200).send({
          products
        });
      }
    }
  });
}

function searchProducts(req, res) {
  let search = req.query;
  console.log(search);
  if (search == undefined) {
    res.status(404).send({
      message: "No hay productos"
    });
  } else {
    let query = {};
    // Separate search parameters
    let searchTipoCafe = search.tipoCafe;
    let searchTipoGrano = search.tipoGrano;
    let searchCafeLocal = search.cafeLocal;
    if (searchTipoCafe != undefined) {
      query.tipoCafe = searchTipoCafe;
    }
    if (searchTipoGrano != undefined) {
      query.tipoGrano = searchTipoGrano;
    }
    if (searchCafeLocal != undefined) {
      query.cafeLocal = searchCafeLocal;
    }
    // Search in database with given parameters
    Product.find(query, (err, products) => {
      if (err) {
        res.status(500).send({
          message: "Error en la petición"
        });
      } else {
        if (!products) {
          res.status(404).send({
            message: "No hay productos"
          });
        } else {
          res.status(200).send({
            products
          });
        }
      }
    });
  }
}

function getProductByUUID(req, res) {
  let uuid = req.params.uuid;
  if (uuid == undefined) {
    return res.status(400).json({
      error: "UUID is required"
    });
  } else {
    console.log(uuid);
    // Search in database with given parameters, return only one product
    Product.findOne({
      UUID: uuid
    }, (err, product) => {
      if (err) {
        res.status(500).send({
          message: "Error en la petición"
        });
      } else {
        if (!product) {
          res.status(404).send({
            message: "No hay productos"
          });
        } else {
          res.status(200).send({
            product
          });
        }
      }
    });
  }
}

function createProduct(req, res) {
  let product = req.body;
  if (product == undefined) {
    return res.status(400).json({
      error: "Product is required"
    });
  } else {
    // Check if product name is already in use
    Product.findOne({
      name: product.name
    }, (err, productFound) => {
      if (err) {
        return res.status(500).json({
          error: "Error in the request"
        });
      }
      if (productFound) {
        return res.status(400).json({
          error: "A product with that name already exists!"
        });
      } else {
        let newProduct = new Product();
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.pricePerUnit = product.pricePerUnit;
        newProduct.image = product.image;
        newProduct.stock = product.stock;
        newProduct.tipoCafe = product.tipoCafe;
        newProduct.tipoGrano = product.tipoGrano;
        newProduct.estado = product.estado;
        newProduct.save((err, productStored) => {
          if (err) {
            res.status(500).send(err);
          } else {
            if (!productStored) {
              res.status(404).send({
                message: "No se ha guardado el producto"
              });
            } else {
              res.status(200).send({
                product: productStored
              });
            }
          }
        });
      }
    });
  }
}

function updateProduct(req, res) {
  let uuid = req.params.UUID;
  let updatedProduct = req.body;
  if (uuid == undefined) {
    res.status(400).json({
      error: "UUID is required"
    });
  } else if (updatedProduct == undefined) {
    res.status(400).json({
      error: "Product is required"
    });
  } else {
    Product.findOneAndUpdate({
      uuid
    }, updatedProduct, {
      new: true
    }, (err, product) => {
      if (err) {
        res.status(500).json({
          error: "Error updating product"
        });
      } else {
        res.status(200).json(product);
      }
    });
  }
}

function deleteProduct(req, res) {
  let uuid = req.params.uuid;
  if (uuid == undefined) {
    res.status(400).json({
      error: "UUID is required"
    });
  } else {
    Product.findOneAndDelete({
      uuid: uuid
    }, (err, product) => {
      if (err) {
        res.status(500).json({
          error: "Error deleting product"
        });
      } else {
        res.status(200).json({
          message: "Product successfully deleted"
        });
      }
    });
  }
}


exports.getProducts = getProducts;
exports.searchProducts = searchProducts;
exports.getProductByUUID = getProductByUUID;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;