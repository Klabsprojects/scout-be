const app = require('express')();
require("./login/login.route")(app);
require("./user/user.route")(app);
require("./product/product.route")(app);
module.exports = app;