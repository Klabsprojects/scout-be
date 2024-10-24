module.exports = (app) => {
    const value = require("../../controllers/order/cart.controller");
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
    "/addCart",
    // [jwt.verifyToken],
    value.addCart
  );

  app.route("/listCart")
    .get(value.listCart)

  app.delete(
    "/deleteCart",
    value.deleteCart
  )

}