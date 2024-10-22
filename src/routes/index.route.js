const app = require('express')();
require("./login/login.route")(app);
require("./user/user.route")(app);
require("./order/product.route")(app);
require("./order/order.route")(app);
require("./order/address.route")(app);
module.exports = app;