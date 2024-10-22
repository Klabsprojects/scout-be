const db = require("../../../utils/sequelize.db");
const commonService = require("../../services/commonService");
const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
const { successRes, errorRes } = require("../../middlewares/response.middleware")

const bcrypt = require('bcryptjs');

let file = "cart.controller";
let Jkey = process.env.JWT_SECRET_KEY;

// listCart
exports.listCart = async (req, res) => {
    console.log('helo from  controller');
    try {
        let query = {};
        query.where = req.query;
         console.log('query ', query);
        let results;
        if (req.query.loginId) {
            console.log('if');
            results = await commonService.findAll(db.cart, query);
        }
        else {
            throw 'No Records Found';
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

// addCart
exports.addCart = async (req, res) => {
    try {
        console.log('try');
        console.log(req.body);
        let resultArr;
        if(req.body.loginId && req.body.productId && req.body.quantity){
            let query = req.body;

            const results = await commonService.insertOne(db.cart, query);
            console.log('results ', results);
            successRes(res, results, SUCCESS.CREATED);
        }
        else
            throw 'Error on inputs'
        
    } catch (error) {
        console.log('catch', error);
        const message = error.message ? error.message : ERRORS.LISTED;
        errorRes(res, error, message, file);
    }
    }