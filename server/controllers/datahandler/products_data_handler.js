"use strict";

const Product = require("../../models/products");

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!products) {
        res.status(404).send({ message: "No hay productos" });
      } else {
        res.status(200).send({ products });
      }
    }
  });
}

function getProduct(req, res) {
  Product.find({}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Products not found"
      });
    }
    res.json(products);
  });
}

function getProductByUUID(req, res) {
  let uuid = req.params.uuid;
  Product.findOne({
    uuid
  }, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Product not found"
      });
    }
    res.json(product);
  });
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
  for (let property in updatedProduct) {
      if (['name', 'description', 'pricePerUnit', 'image', 'category', 'stock'].includes(property)) continue;
      delete updatedProduct[property];
  }
  Product.findOneAndUpdate({
      uuid: `${UUID}`
  }, updatedProduct, {
      new: true
  }).then(product => {
      res.type('text/plain; charset=utf-8');
      res.send(`Product ${product.name} was updated!`);
  });
}

function removeProduct(req, res) {
  let uuid = req.params.UUID;
  Product.findOneAndDelete({
      uuid: `${UUID}`
  }).then(product => {
      res.type('text/plain; charset=utf-8');
      res.send(product != undefined ? `Product with uuid ${uuid} has been deleted!` 
          : `No product with uuid ${uuid} was found!`);
  });
}

exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.getProductByUUID = getProductByUUID;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.removeProduct = removeProduct;