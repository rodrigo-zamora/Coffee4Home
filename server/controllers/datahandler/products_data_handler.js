"use strict";

const Order = require("../../models/products");

function getAllProducts(req, res) {
  Order.find({}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Products not found"
      });
    }
    res.json(products);
  }
    );
}

function getProductByUUID(req, res) {
  let uuid = req.params.uuid;
  Order.findOne({ uuid }, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Product not found"
      });
    }
    res.json(product);
  });
}

function createProduct(req, res) {
  let product = new Order(req.body);
  product.save((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to create new product"
      });
    }
    res.json(product);
  });
}

function updateProduct(req, res) {
  let uuid = req.params.uuid;
    Order.findOneAndUpdate({ uuid }, req.body, { new: true }, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update product"
      });
    }
    res.json(product);
  });
}

function removeProduct(req, res) {
  let uuid = req.params.uuid;
    Order.findOneAndRemove({ uuid }, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete product"
      });
    }
    res.json({
      message: "Product deleted successfully"
    });
  }
    );
}

function getProductsByCategory(req, res) {
    let category = req.params.category;
    Order.find({ category }, (err, products) => {
        if (err) {
        return res.status(400).json({
            error: "Products not found"
        });
        }
        res.json(products);
    });
}

function getProductsByPrice(req, res) {
    let price = req.params.price;
    Order.find({ price }, (err, products) => {
        if (err) {
        return res.status(400).json({
            error: "Products not found"
        });
        }
        res.json(products);
    });
}

function getProductsByName(req, res) {
    let name = req.params.name;
    Order.find({ name }, (err, products) => {
        if (err) {
        return res.status(400).json({
            error: "Products not found"
        });
        }
        res.json(products);
    }
    );
}

exports.getAllProducts = getAllProducts;
exports.getProductByUUID = getProductByUUID;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.removeProduct = removeProduct;
exports.getProductsByCategory = getProductsByCategory;
exports.getProductsByPrice = getProductsByPrice;
exports.getProductsByName = getProductsByName;