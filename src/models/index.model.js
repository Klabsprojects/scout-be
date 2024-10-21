const { Login } = require('./login/login.model');
const { User } = require('./user/user.model');
const { Product } = require('./product/product.model');

let schema = [];

schema.push(
);

let utils = {
    paranoid: true
};

module.exports = { schema, utils };