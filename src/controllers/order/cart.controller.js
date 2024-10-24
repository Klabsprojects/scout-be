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

exports.deleteCart = async(req, res) => {
  try{
    console.log('req.query ', req.query);
    let query = {};
    let results;
    if(req.query.productId && req.query.loginId){
      query.where = {
        productId: req.query.productId,
        loginId: req.query.loginId
      }
      let product = await commonService.findOne(db.cart, query);
      console.log('Fetched product:', product);
      if(product)
        results = await commonService.delete(db.cart, query);
      else
        throw 'No product found';
    }
    else
      throw 'Please provide valid inputs';
    console.log('success');
    console.log(results);
    successRes(res, results, SUCCESS.DELETED);
  }
  catch(error){
    console.log('Error ', error);
    const message = error.message ? error.message : ERRORS.DELETED;
    errorRes(res, error, message, file);
  }
}

exports.updateProductCount = async(req, res) => {
  try{
    console.log('req.query ', req.query);
    let query = {};
    let results;
    const { productId, loginId, quantity } = req.query; 
    if(req.query.productId && req.query.loginId){
      query.where = {
        id: productId
      }
      let product = await commonService.findOne(db.product, query);
      console.log('Fetched product:', product);
      if (product) {
        const newQuantity = product.quantity - quantity;
    
        console.log('Current Quantity:', product.quantity, 'New Quantity:', newQuantity);
    
        if (newQuantity >= 0) {
          await commonService.update(db.cart, {
            where: { productId: productId, 
              loginId: loginId
             },
            body: { quantity: quantity }, // Update quantity
          });
          console.log('Stock updated successfully for Product ID:', productId);
            console.log('success');
            console.log(results);
            successRes(res, results, SUCCESS.UPDATED);
        } else {
          throw new Error('Not enough stock available');
        }
      } else {
        throw new Error('Product not found');
      }
    }
    else
      throw 'Please provide valid inputs';
  }
  catch(error){
    console.log('Error ', error);
    const message = error.message ? error.message : ERRORS.UPDATED;
    errorRes(res, error, message, file);
  }
}
  
// exports.addCartOld = async (req, res) => {
//     try {
//         console.log('try');
//         console.log(req.body);
//         let resultArr;
//         if(req.body.loginId && req.body.productId && req.body.quantity){
//             let query = req.body;

//             const results = await commonService.insertOne(db.cart, query);
//             console.log('results ', results);
//             successRes(res, results, SUCCESS.CREATED);
//         }
//         else
//             throw 'Error on inputs'
        
//     } catch (error) {
//         console.log('catch', error);
//         const message = error.message ? error.message : ERRORS.LISTED;
//         errorRes(res, error, message, file);
//     }
//     }

