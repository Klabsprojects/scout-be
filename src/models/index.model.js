const { Login } = require('./login/login.model');
const { User } = require('./user/user.model');
const { Product } = require('./order/product.model');
const { Order } = require('./order/order.model');
const { Address } = require('./order/address.model');

let schema = [];

schema.push(
);

let utils = {
    paranoid: true
};

module.exports = { schema, utils };