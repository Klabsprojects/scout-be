const app = require('express')();
require("./login/login.route")(app);
require("./user/user.route")(app);
require("./order/product.route")(app);
require("./order/order.route")(app);
module.exports = app;