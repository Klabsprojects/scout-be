const db = require("../../../utils/sequelize.db");
const commonService = require("../../services/commonService");
const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
const { successRes, errorRes } = require("../../middlewares/response.middleware")

const bcrypt = require('bcryptjs');

let file = "login.controller";
let Jkey = process.env.JWT_SECRET_KEY;

// listProduct
exports.listProduct = async (req, res) => {
    console.log('helo from  controller');
    try {
        let query = {};
        query.where = req.query;
         console.log('query ', query);
        let results;
        if (req.query.id) {
            console.log('if');
            results = await commonService.findOne(db.product, query);
        }
        else {
            console.log('else');

            results = await commonService.findAll(db.product, query);
        }
        console.log('success');
        console.log(results);
        successRes(res, results, SUCCESS.LISTED);
    } catch (error) {
        console.log('error', error);
        const message = error.message ? error.message : ERRORS.LISTED;
        errorRes(res, error, message, file);
    }
}

// addProduct
exports.addProduct = async (req, res) => {
    try {
        console.log('try');
        console.log(req.body);
        let query = req.body;
        if (req.file) {
            query.filepath = req.file.path;
            console.log('Uploaded file path:', req.file.path);
        } else {
            throw new Error('File upload failed: No file uploaded');
        }
        const results = await commonService.insertOne(db.product, query);
        successRes(res, results, SUCCESS.CREATED);
    } catch (error) {
        console.log('catch', error);
        const message = error.message ? error.message : ERRORS.LISTED;
        errorRes(res, error, message, file);
    }
    }