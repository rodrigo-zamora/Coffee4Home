'use strict';
const crypto = require('crypto-js');

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0;
        let v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateOrderUUID() {
    return 'xxxyyxxxx-xxxx-4xxx-yxxx-xxyxxxyxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0;
        let v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

exports.generateUUID = generateUUID;
exports.generateOrderUUID = generateOrderUUID;
