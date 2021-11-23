'use strict';

const utils = require('./utils');

class UserException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class User {
    constructor(firstName, lastName, email, password, street, city, state, zip, phone) {
        this._uuid = utils.generateUUID();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
    }

    get uuid() {
        return this._uuid;
    }

    set uuid(uuid) {
        throw new UserException('Users UUIDs are auto-generated.');
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName) {
        if (typeof firstName !== 'string') {
            throw new UserException('First name must be a string.');
        } else if (firstName.length < 2) {
            throw new UserException('First name must be at least 2 characters long.');
        } else if (firstName.length > 50) {
            throw new UserException('First name must be less than 50 characters long.');
        }
        this._firstName = firstName;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(lastName) {
        if (typeof lastName !== 'string') {
            throw new UserException('Last name must be a string.');
        } else if (lastName.length < 2) {
            throw new UserException('Last name must be at least 2 characters long.');
        } else if (lastName.length > 50) {
            throw new UserException('Last name must be less than 50 characters long.');
        }
        this._lastName = lastName;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        if (typeof email !== 'string') {
            throw new UserException('Email must be a string.');
        } else if (email.length < 2) {
            throw new UserException('Email must be at least 2 characters long.');
        } else if (email.length > 50) {
            throw new UserException('Email must be less than 50 characters long.');
        }
        this._email = email;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        if (typeof password !== 'string') {
            throw new UserException('Password must be a string.');
        } else if (password.length < 8) {
            throw new UserException('Password must be at least 8 characters long.');
        } else if (password.length > 50) {
            throw new UserException('Password must be less than 50 characters long.');
        }
        this._password = password;
    }

    get street() {
        return this._street;
    }

    set street(street) {
        if (typeof street !== 'string') {
            throw new UserException('Street must be a string.');
        } else if (street.length < 2) {
            throw new UserException('Street must be at least 2 characters long.');
        } else if (street.length > 50) {
            throw new UserException('Street must be less than 50 characters long.');
        }
        this._street = street;
    }

    get city() {
        return this._city;
    }

    set city(city) {
        if (typeof city !== 'string') {
            throw new UserException('City must be a string.');
        } else if (city.length < 2) {
            throw new UserException('City must be at least 2 characters long.');
        } else if (city.length > 50) {
            throw new UserException('City must be less than 50 characters long.');
        }
        this._city = city;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        if (typeof state !== 'string') {
            throw new UserException('State must be a string.');
        } else if (state.length < 2) {
            throw new UserException('State must be at least 2 characters long.');
        } else if (state.length > 50) {
            throw new UserException('State must be less than 50 characters long.');
        }
        this._state = state;
    }

    get zip() {
        return this._zip;
    }

    set zip(zip) {
        if (typeof zip !== 'string') {
            throw new UserException('Zip must be a string.');
        } else if (zip.length !== 5) {
            throw new UserException('Zip must be 5 characters long.');
        }
        this._zip = zip;
    }

    get phone() {
        return this._phone;
    }

    set phone(phone) {
        if (typeof phone !== 'string') {
            throw new UserException('Phone must be a string.');
        } else if (phone.length !== 10 || phone.length !== 8) {
            throw new UserException('Phone must be 8 or 10 characters long.');
        }
        this._phone = phone;
    }

   static createFromJSON(json) {
       let object = JSON.parse(json);
       return User.createFromObject(object);
   }
       
    static createFromObject(object) {
       let newUser = {};
       Object.assign(newUser, object);
       User.cleanObject(newUser);
       let user = new User(newUser.firstName, newUser.lastName, newUser.email, newUser.password, newUser.street, newUser.city, newUser.state, newUser.zip, newUser.phone);
       return user;
   }

   static cleanObject(object) {
       const props = ['firstName', 'lastName', 'email', 'password', 'street', 'city', 'state', 'zip', 'phone'];
       for (let prop in object) {
              if (!props.includes(prop)) {
                delete object[prop];
              }
         }
    }
}

module.exports = User;