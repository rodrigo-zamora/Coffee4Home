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
  try {
    Product.findOne({
      uuid: `${product.UUID}`
    }).then(newProduct => {
      if (newProduct == undefined) {
        Product.create(product).then(product => {
          res.type('text/plain; charset=utf-8');
          res.send(`Product ${product.UUID} was created!`);
        });
      } else {
        res.type('text/plain; charset=utf-8');
        res.send(`Product with uuid ${product.UUID} already exists!`);
      }
    });
  } catch (err) {
    res.status(400).json(err);
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

function removeProduct(req, res) {
  let uuid = req.params.uuid;
  if (uuid == undefined) {
    res.status(400).json({
      error: "UUID is required"
    });
  } else {
    Product.findOneAndDelete({
      uuid: `${uuid}`
    }).then(product => {
      if (product == undefined) {
        res.type('text/plain; charset=utf-8');
        res.send(`Product with uuid ${uuid} was not found!`);
      } else {
        res.type('text/plain; charset=utf-8');
        res.send(`Product with uuid ${uuid} and name ${product.name} was deleted!`);
      }
    });
  }
}

exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.getProductByUUID = getProductByUUID;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.removeProduct = removeProduct;