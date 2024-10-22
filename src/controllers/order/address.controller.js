const db = require("../../../utils/sequelize.db");
const commonService = require("../../services/commonService");
const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
const { successRes, errorRes } = require("../../middlewares/response.middleware")

const bcrypt = require('bcryptjs');

let file = "address.controller";
let Jkey = process.env.JWT_SECRET_KEY;

// listAddress
exports.listAddress = async (req, res) => {
    console.log('helo from  controller');
    try {
        let query = {};
        query.where = req.query;
         console.log('query ', query);
        let results;
        if (req.query.id) {
            console.log('if');
            results = await commonService.findOne(db.address, query);
        }
        else {
            console.log('else');

            results = await commonService.findAll(db.address, query);
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

// addAddress
exports.addAddress = async (req, res) => {
    try {
        console.log('try');
        console.log(req.body);
        let query = req.body;

        const results = await commonService.insertOne(db.address, query);
       
        successRes(res, results, SUCCESS.CREATED);
    } catch (error) {
        console.log('catch', error);
        const message = error.message ? error.message : ERRORS.LISTED;
        errorRes(res, error, message, file);
    }
    }