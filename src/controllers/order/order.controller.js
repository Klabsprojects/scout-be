const db = require("../../../utils/sequelize.db");
const commonService = require("../../services/commonService");
const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
const { successRes, errorRes } = require("../../middlewares/response.middleware")

const bcrypt = require('bcryptjs');

let file = "order.controller";
let Jkey = process.env.JWT_SECRET_KEY;



// addOrder
exports.addOrder = async (req, res) => {
    try {
        console.log('try');
        console.log(req.body);
        let resultArr;
        let query = {
            productId: req.body.productId,
            orderBy: req.body.orderBy,
            totalPrice: req.body.totalPrice,
            quantity: req.body.quantity
        }
        //req.body;

        const results = await commonService.insertOne(db.order, query);
        console.log('results ', results);
        if (!results) {
            return res.status(401).json({ error: 'Error on Order creation' });
            }
        if (results){
            let addressQuery = {
                orderId: results.id,
                address: req.body.address,
                pincode: req.body.pincode,
                primaryOrSecondary: req.body.primaryOrSecondary
            }
            resultArr = await commonService.insertOne(db.address, addressQuery);
        }
        successRes(res, results, SUCCESS.CREATED);
    } catch (error) {
        console.log('catch', error);
        const message = error.message ? error.message : ERRORS.LISTED;
        errorRes(res, error, message, file);
    }
    }