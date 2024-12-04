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
        if (req.query.loginId) {
            console.log('if');
            query.where.isActive = true;
            results = await commonService.findAll(db.address, query);
        }
        else
            throw 'Please provid valid input';
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
            //res.status(500).json({ error: 'Address Registration failed' });
        
    }
    }

    exports.delete = async (req, res) => {
        console.log('hello from delete address controller');
        try {
            let query ={};
            // Extract the guide id from the request query
            const { id } = req.query;
    
            if (!id) {
                return errorRes(res, null, "Address ID is required.", ERRORS.NOT_FOUND);
            }
    
            console.log(`Attempting to delete address with ID: ${id}`);
    
            // Step 1: Fetch the guide to get the loginId
            const address = await commonService.findOne(db.address, { where: { id } });
    
            if (!address) {
                return errorRes(res, null, "address not found.", ERRORS.NOT_FOUND);
            }

            query.where = {
                id: id
            }
            query.body = {
                isActive: false
            }
            // Step 4: Delete the guide after login is deleted
            const deleteResult = await commonService.update(db.address, query);
    
            if (deleteResult) {
                console.log('address deleted successfully');
                successRes(res, null, SUCCESS.DELETED);
            } else {
                console.log('address not found');
                errorRes(res, null, "address not found.", ERRORS.NOT_FOUND);
            }
    
        } catch (error) {
            console.log('Error deleting address:', error);
            const message = error.message ? error.message : ERRORS.GENERIC;
            errorRes(res, error, message);
        }
    };