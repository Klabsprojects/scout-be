const db = require("../../../utils/sequelize.db");
const commonService = require("../../services/commonService");
const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
const { successRes, errorRes } = require("../../middlewares/response.middleware")
const { User } = require("../../models/user/user.model")

const bcrypt = require('bcryptjs');
const axios = require('axios');
const https = require('https');

let file = "student.controller";
let Jkey = process.env.JWT_SECRET_KEY;

exports.registerStudent = async (req, res) => {
    try {
        console.log('try student register');
        console.log(req.body);
        let query = req.body;
        if (req.file) {
            query.photoPath = req.file.path;
            console.log('Uploaded file path:', req.file.path);
        } else {
            throw new Error('Photo upload failed: No Photo uploaded');
        }
        const results = await commonService.insertOne(db.user, query);
        console.log(results);
        successRes(res, results, SUCCESS.CREATED);
    } catch (error) {
        console.log('catch', error);
        const message = error.message ? error.message : ERRORS.LISTED;
        errorRes(res, error, message, file);
    }
    }

    exports.getStudent = async (req, res) => {
        console.log('helo from getAnnexure1 controller');
        try {
            console.log('req.query', req.query);
            let query = {};
            query.where = req.query;
             console.log('query ', query);
            let results = [];
            if (req.query.id) {
                console.log('if');
                let oneResult = await commonService.findOne(db.user, query);
                results.push(oneResult);
            } 
            if (req.query.approvalStatus) {
                console.log('if');
                let oneResult = await commonService.findAll(db.user, query);
                results.push(oneResult);
            } 
            else {
                console.log('else ');
                results = await commonService.findAll(db.user, query);
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
