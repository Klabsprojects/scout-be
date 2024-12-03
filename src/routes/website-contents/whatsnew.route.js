module.exports = (app) => {
    const value = require("../../controllers/website-contents/whatsnew.controller");
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
    "/addWhatsNew",
    [jwt.verifyToken],
    upload.fields([
      { name: 'fileTamil', maxCount: 1 },
      { name: 'fileEnglish', maxCount: 1 },
    ]),
    value.addWhatsNew
  );

  app.get(
    "/listWhatsNew",
    value.listWhatsNew
  );
  

}