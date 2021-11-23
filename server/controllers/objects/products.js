const utils = require('../utils/uuid_utils');

class ProductException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Product {
    constructor(name, description, image, pricePerUnit, category, stock) {
        this._uuid = utils.generateUUID();
        this.name = name;
        this.description = description;
        this.image = image;
        this.pricePerUnit = pricePerUnit;
        this.category = category;
        this.stock = stock;
    }

    get uuid() {
        return this._uuid;
    }

    set uuid(uuid) {
        throw new ProductException('Products UUIDs are auto-generated');
    }

    get name() {
        return this._name;
    }

    set name(name) {
        if (!name) {
            throw new ProductException('Products must have a name');
        } else if (typeof name !== 'string') {
            throw new ProductException('Products name must be a string');
        }
        this._name = name;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        if (!description) {
            throw new ProductException('Products must have a description');
        } else if (typeof description !== 'string') {
            throw new ProductException('Products description must be a string');
        }
        this._description = description;
    }
    
    get image() {
        return this._image;
    }

    set image(image) {
        if (!image) {
            throw new ProductException('Products must have an image URL');
        } else if (typeof image !== 'string') {
            throw new ProductException('Products image URL must be a string');
        }
        this._image = image;
    }

    get pricePerUnit() {
        return this._pricePerUnit;
    }

    set pricePerUnit(pricePerUnit) {
        if (!pricePerUnit) {
            throw new ProductException('Products must have a price');
        } else if (typeof pricePerUnit !== 'number') {
            throw new ProductException('Products price must be a number');
        }
        this._pricePerUnit = pricePerUnit;
    }

    get category() {
        return this._category;
    }

    set category(category) {
        if (!category) {
            throw new ProductException('Products must have a category');
        } else if (typeof category !== 'string') {
            throw new ProductException('Products category must be a string');
        }
        this._category = category;
    }

    get stock() {
        return this._stock;
    }

    set stock(stock) {
        if (!stock) {
            throw new ProductException('Products must have a stock');
        } else if (typeof stock !== 'number') {
            throw new ProductException('Products stock must be a number');
        }
        this._stock = stock;
    }

    static createFromJSON(json) {
        let object = JSON.parse(json);
        return Product.createFromObject(object);
    }

    static createFromObject(object) {
        let newProduct = {};
        Object.assign(newProduct, object);
        Product.cleanObject(newProduct);
        let product = new Product(newProduct.name, newProduct.description, newProduct.image, newProduct.pricePerUnit, newProduct.category, newProduct.stock);
        return product;
    }

    static cleanObject(object) {
        const props = ['uuid', 'name', 'description', 'image', 'pricePerUnit', 'category', 'stock'];
        for (let prop of object) {
            if (!props.includes(prop)) {
                delete object[prop];
            }
        }
    }
}

module.exports = {
    ProductException,
    Product
}