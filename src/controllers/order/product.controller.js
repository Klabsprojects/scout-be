const db = require("../../../utils/sequelize.db");
const commonService = require("../../services/commonService");
const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
const { successRes, errorRes } = require("../../middlewares/response.middleware")

const bcrypt = require('bcryptjs');

let file = "product.controller";
let Jkey = process.env.JWT_SECRET_KEY;

// listProduct
exports.listProduct = async (req, res) => {
    console.log('helo from  controller');
    try {
        let query = {};
        req.query.status = 'active';
        query.where = req.query;
         console.log('query ', query);
        let results;
        if (req.query.categoryList) {
            console.log('Listing unique categories');
            // Fetch distinct categories from the product table
            results = await db.product.findAll({
              attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('category')), 'category']]
            });
          }
        else if (req.query.id) {
            console.log('if');
            results = await commonService.findOne(db.product, query);
        }
        else if(req.query.category){
            console.log('else if');
            results = await commonService.findAll(db.product, query);
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
        if(query.category){
            const results = await commonService.insertOne(db.product, query);
            successRes(res, results, SUCCESS.CREATED);
        }
        else
            throw 'Pls provide valid inputs';
    } catch (error) {
        console.log('catch', error);
        const message = error.message ? error.message : ERRORS.UPDATED;
        errorRes(res, error, message, file);
    }
    }

exports.editProduct = async (req, res) => {
    try {
        console.log('try');
        console.log(req.body);
        let query = {};
        let results;
        if (req.file) {
            query.filepath = req.file.path;
            console.log('Uploaded file path:', req.file.path);
        } else {
            throw new Error('File upload failed: No file uploaded');
        }
        if(req.query.id && req.body){
            query.where = {
                id: req.query.id
            }
            query.body = req.body;
            results = await commonService.update(db.product, query);
            console.log('Updated Product Item:', results);
          successRes(res, results, SUCCESS.UPDATED);
        }
        else
            throw 'Pls provide valid inputs'
    }
    catch(error){
        console.log('catch', error);
        const message = error.message ? error.message : ERRORS.LISTED;
        errorRes(res, error, message, file);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        console.log('try');
        console.log(req.body);
        let query = {};
        let results;
        if(req.query.id){
            query.where = {
                id: req.query.id
            }
            query.body = {
                status: 'inactive'
            }
            results = await commonService.update(db.product, query);
            console.log('Deleted Product Item:', results);
          successRes(res, results, SUCCESS.DELETED);
        }
        else
            throw 'Pls provide valid inputs'
    }
    catch(error){
        console.log('catch', error);
        const message = error.message ? error.message : ERRORS.DELETED;
        errorRes(res, error, message, file);
    }
}