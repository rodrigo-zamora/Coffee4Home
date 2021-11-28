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

function getProduct(req, res) {
  let query = req.query;
  let filter = {};
  if (query.name) {
    filter.name = query.name;
  }
  if (query.price) {
    filter.price = query.price;
  }
  if (query.stock) {
    filter.stock = query.stock;
  }
  if (query.category) {
    filter.category = query.category;
  }
  if (query.description) {
    filter.description = query.description;
  }
  if (query.UUID) {
    filter.UUID = query.UUID;
  }
  if (query.image) {
    filter.image = query.image;
  }
  if (query.createdAt) {
    filter.createdAt = query.createdAt;
  }
  if (query.updatedAt) {
    filter.updatedAt = query.updatedAt;
  }
  if (query.__v) {
    filter.__v = query.__v;
  }
  Product.find(filter, (err, products) => {
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

function getProductByUUID(req, res) {
  let uuid = req.params.uuid;
  if (uuid == undefined) {
    return res.status(400).json({
      error: "UUID is required"
    });
  } else {
    Product.find({
      uuid: uuid
    }, (err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      res.json(product);
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
    console.log("UUID of product to be deleted: " + uuid);
    Product.findOneAndDelete({
      uuid: `${uuid}`
    }, (err, product) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log("Product deleted: " + product);
        res.status(200).send(`Product with UUID ${product.uuid} and name ${product.name} was deleted!`);
      }
    });
    if (toDelete == undefined || toDelete == null) {
      res.status(404).send(`Product with UUID ${uuid} was not found`);
  } else if (toDelete.length == 0) {
      res.status(404).send(`Product with UUID ${uuid} was not found`);
    } else {
      console.log(toDelete);
      Product.findOneAndDelete({
        uuid
      }, (err, product) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(`Product with UUID ${uuid} was deleted`);
        }
      });
    }
  }
}

exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.getProductByUUID = getProductByUUID;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;