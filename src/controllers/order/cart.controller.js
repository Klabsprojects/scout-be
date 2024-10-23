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
  
      if (req.body.loginId && req.body.productId && req.body.quantity) {
        const { loginId, productId, quantity } = req.body;
  
        // Step 1: Check if the product is already in the cart for the user
        let existingCartItem = await commonService.findOne(db.cart, {
          where: {
            loginId: loginId,
            productId: productId,
          },
        });
  
        if (existingCartItem) {
          // Step 2: If product exists in cart, update the quantity
          const newQuantity = existingCartItem.quantity + quantity; // Add new quantity to the existing one
          let updateQuery = {
            where: {
              loginId: loginId,
              productId: productId,
            },
            body: {
              quantity: newQuantity,
            },
          };
  
          const updatedResult = await commonService.update(db.cart, updateQuery);
          console.log('Updated Cart Item:', updatedResult);
          successRes(res, updatedResult, SUCCESS.UPDATED);
        } else {
          // Step 3: If product does not exist, insert a new entry
          let query = {
            loginId: loginId,
            productId: productId,
            quantity: quantity,
          };
  
          const newCartItem = await commonService.insertOne(db.cart, query);
          console.log('New Cart Item:', newCartItem);
          successRes(res, newCartItem, SUCCESS.CREATED);
        }
      } else {
        throw new Error('Error on inputs');
      }
    } catch (error) {
      console.log('catch', error);
      const message = error.message ? error.message : ERRORS.LISTED;
      errorRes(res, error, message, file);
    }
  };

  
exports.addCartOld = async (req, res) => {
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

