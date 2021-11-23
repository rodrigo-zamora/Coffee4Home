"use strict";

class ShoppingCartException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class ProductProxy {
    constructor(productUUID, amount) {
        this.productUUID = productUUID;
        this.amount = amount;
    }
}

class ShoppingCart {
    constructor() {
        this.products = [];
        this._productProxies = [];
    }

    get productsProxies() {
        return this._productsProxies;
    }

    set productsProxies(productsProxies) {
        throw new ShoppingCartException("Can't modify productProxies directly.");
    }

    get products() {
        return this._products;
    }

    set products(products) {
        if (typeof products === 'string') {
            products = JSON.parse(products);
        }
        if (!Array.isArray(products)) {
            for (let product of products) {
                Product.createFromObject(product);
            }
        } else {
            this._products.push(Product.createFromObject(product));
        }
    }

    addProduct(productUUID, amount) {
        let productProxy = this._productsProxies.find(productProxy => productProxy.productUUID === productUUID);
        if (productProxy) {
            productProxy.amount += amount;
        } else {
            productProxy = new ProductProxy(uuid, amount);
            this._productsProxies.push(productProxy);
        }
    }

    calculateTotalPrice() {
        let totalPrice = 0;
        for (let productProxy of this._productsProxies) {
            totalPrice += productProxy.amount * productProxy.product.price;
        }
        return totalPrice;
    }
}

module.exports = {
    ShoppingCart,
    ShoppingCartException
}