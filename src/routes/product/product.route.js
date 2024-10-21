module.exports = (app) => {
    const value = require("../../controllers/product/product.controller");
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
    "/addProduct",
    // [jwt.verifyToken],
    upload.single('filepath'),
    value.addProduct
  );

  app.route("/listProduct")
    .get(value.listProduct)

}