module.exports = (app) => {
    const value = require("../../controllers/user/user.controller");
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

  app.get(
    "/getStudent",
    // [jwt.verifyToken],
    value.getStudent
  );

  app.post(
    "/registerStudent",
    // [jwt.verifyToken],
    upload.single('filepath'),
    value.registerStudent
  );
}