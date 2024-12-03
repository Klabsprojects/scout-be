const db = require("../../../utils/sequelize.db");
const commonService = require("../../services/commonService");
const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
const { successRes, errorRes } = require("../../middlewares/response.middleware")

let file = "whatsnew.controller";
let Jkey = process.env.JWT_SECRET_KEY;

// listWhatsNew
exports.listWhatsNew = async (req, res) => {
    console.log('helo from listWhatsNew controller');
    try {
        let query = {};
        query.where = req.query;
         console.log('query ', query);
        let results;
        
            console.log('if');
            results = await commonService.findAll(db.whatsnew, query);

        console.log('success');
        console.log(results);
        successRes(res, results, SUCCESS.LISTED);
    } catch (error) {
        console.log('error', error);
        const message = error.message ? error.message : ERRORS.LISTED;
        errorRes(res, error, message, file);
    }
}

// addWhatsNew
exports.addWhatsNewold = async (req, res) => {
    try {
        console.log('try', req.body);
        
        let query = {};
        query.body = req.body;
        if (req.files && req.files['fileTamil'] && req.files['fileTamil'].length > 0) {
            query.body.fileTamil = req.files['fileTamil'][0].path; // Assuming only one file is uploaded
            console.log('Uploaded fileTamil file path:', req.files['fileTamil'][0].path);
        }
        if (req.files && req.files['fileEnglish'] && req.files['fileEnglish'].length > 0) {
            query.body.fileEnglish = req.files['fileEnglish'][0].path; // Assuming only one file is uploaded
            console.log('Uploaded fileEnglish file path:', req.files['fileEnglish'][0].path);
        }
        if (req.body.dateOfUpload) {
            req.body.dateOfUpload = new Date(req.body.dateOfUpload);
        }
        console.log(req.body);
        //dateOfUpload: new Date('2024-01-01'),
        const results = await commonService.insertOne(db.whatsnew, query);
        successRes(res, results, SUCCESS.CREATED);
    } catch (error) {
        console.log('catch', error);
            const message = error.message ? error.message : ERRORS.LISTED;
            errorRes(res, error, message, file);
        
    }
    }

    exports.addWhatsNew = async (req, res) => {
        try {
            console.log('Received request body:', req.body);
    
            let query = {};
            query.body = req.body;
    
            // Handle file uploads
            if (req.files && req.files['fileTamil'] && req.files['fileTamil'].length > 0) {
                query.body.fileTamil = req.files['fileTamil'][0].path;
                console.log('Uploaded fileTamil file path:', req.files['fileTamil'][0].path);
            }
            if (req.files && req.files['fileEnglish'] && req.files['fileEnglish'].length > 0) {
                query.body.fileEnglish = req.files['fileEnglish'][0].path;
                console.log('Uploaded fileEnglish file path:', req.files['fileEnglish'][0].path);
            }
    
            // Ensure dateOfUpload is correctly parsed as a Date object
            if (req.body.dateOfUpload) {
                const parsedDate = new Date(req.body.dateOfUpload);  // Convert to Date object
                if (isNaN(parsedDate.getTime())) {
                    // If date is invalid, log and handle accordingly
                    console.log('Invalid date format:', req.body.dateOfUpload);
                    return errorRes(res, 'Invalid date format', 'Invalid date format for dateOfUpload');
                }
                query.body.dateOfUpload = parsedDate;  // Set the field as a Date object
                console.log('Converted dateOfUpload:', query.body.dateOfUpload);
            } else {
                console.log('dateOfUpload is missing!');
                return errorRes(res, 'Missing dateOfUpload', 'dateOfUpload field is required');
            }
    
            console.log('Final data to be inserted:', req.body);
    
            // Insert the data into the database
            const results = await commonService.insertOne(db.whatsnew, query);
            successRes(res, results, SUCCESS.CREATED);
        } catch (error) {
            console.log('Error in addWhatsNew:', error);
            const message = error.message ? error.message : ERRORS.LISTED;
            errorRes(res, error, message);
        }
    };
    