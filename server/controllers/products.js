const utils = require('../../server/controllers/utils');

class ProductException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Product {
    constructor(title, description, imageURL, pricePerUnit, category) {
        this._uuid = utils.generateUUID();
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
        this.pricePerUnit = pricePerUnit;
        this.category = category;
    }

    get uuid() {
        return this._uuid;
    }

    set uuid(uuid) {
        throw new ProductException('Products UUIDs are auto-generated');
    }

    get title() {
        return this._title;
    }

    set title(title) {
        if (!title) {
            throw new ProductException('Products must have a title');
        } else if (typeof title !== 'string') {
            throw new ProductException('Products title must be a string');
        }
        this._title = title;
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
    
    get imageURL() {
        return this._imageURL;
    }

    set imageURL(imageURL) {
        if (!imageURL) {
            throw new ProductException('Products must have an image URL');
        } else if (typeof imageURL !== 'string') {
            throw new ProductException('Products image URL must be a string');
        }
        this._imageURL = imageURL;
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

    static createFromJSON(json) {
        let object = JSON.parse(json);
        return Product.createFromObject(object);
    }

    static createFromObject(object) {
        let newProduct = {};
        Object.assign(newProduct, object);
        Product.cleanObject(newProduct);
        let product = new Product(newProduct.title, newProduct.description, newProduct.imageURL, newProduct.pricePerUnit, newProduct.category);
        return product;
    }

    static cleanObject(object) {
        const props = ['uuid', 'title', 'description', 'imageURL', 'pricePerUnit', 'category'];
        for (let prop of object) {
            if (!props.includes(prop)) {
                delete object[prop];
            }
        }
    }

}