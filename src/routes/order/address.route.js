module.exports = (app) => {
    const value = require("../../controllers/order/address.controller");
    const { joi, cache } = require("../../helpers/index.helper");
    const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");    
    const upload = require("../../middlewares/upload")
    app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post(
    "/addAddress",
    // [jwt.verifyToken],
    value.addAddress
  );

  app.route("/listAddress")
    .get(value.listAddress)

    app.delete(
      "/deleteAddress",
      value.delete
    )

}