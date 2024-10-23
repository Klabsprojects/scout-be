const db = require("../../../utils/sequelize.db");
const commonService = require("../../services/commonService");
const {  jwt, ERRORS, SUCCESS, Op } = require("../../helpers/index.helper");
const { successRes, errorRes } = require("../../middlewares/response.middleware")


const bcrypt = require('bcryptjs');

let file = "order.controller";
let Jkey = process.env.JWT_SECRET_KEY;

// listOrder
exports.listOrder = async (req, res) => {
    console.log('helo from  controller');
    try {
        let query = {};
        query.where = req.query;
         console.log('query ', query);
        let results;
        if (req.query.id) {
            console.log('if');
            results = await commonService.findOne(db.order, query);
        }
        else {
            console.log('else');

            results = await commonService.findAll(db.order, query);
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

// addOrder
exports.addOrder = async (req, res) => {
    try {
        console.log('try');
        console.log(req.body);
        let addressQuery;
        let orderQuery
    //     if(req.body.fullName && req.body.phoneNumber && req.body.doorNo && req.body.street &&
    //         req.body.address && req.body.city && req.body.state && req.body.pincode
    //     ){
    //         console.log('true 1');
    //         addressQuery = {
    //             "loginId": req.body.orderBy,
    //             "fullName": req.body.fullName,
    //             "phoneNumber": req.body.phoneNumber,
    //             "doorNo": req.body.doorNo,
    //             "street": req.body.street,
    //             "address": req.body.address,
    //             "city": req.body.city,
    //             "state": req.body.state,
    //             "pincode": req.body.pincode
    //        }
    //        const results = await commonService.insertOne(db.address, addressQuery);
    //        console.log('results ', results);
    //         if (results){
    //             console.log('true 2');
    //             orderQuery = {
    //                 orderBy: req.body.orderBy,
    //                 totalPrice: req.body.totalPrice,
    //                 quantity: req.body.quantity,
    //                 addressId: results.id,
    //                 products: req.body.products
    //             }
    //             const orderResults = await commonService.insertOne(db.order, orderQuery);
    //             console.log('orderResults ', orderResults);
    //             successRes(res, orderResults, SUCCESS.CREATED);
    //         }
        
    // }
    //else {
        console.log('true3');
        if(req.body.orderBy && req.body.addressId){
            console.log('true 4');
            orderQuery = {
                orderBy: req.body.orderBy,
                totalPrice: req.body.totalPrice,
                quantity: req.body.quantity,
                addressId: req.body.addressId,
                products: req.body.products
            }
            const orderResults = await commonService.insertOne(db.order, orderQuery);
            console.log('orderResults ', orderResults);
            // Update the product count for each product in the order
            for (let product of req.body.products) {
                console.log('product ', product);
                const productId = product.productId;
                const quantityOrdered = product.quantity;

                // Update the product stock (you'll need to define this function)
                await this.updateProductStock(productId, quantityOrdered);
            }
            successRes(res, orderResults, SUCCESS.CREATED);
        }
        else    
            throw 'Pls provide valid order inputs';
    //}
    } catch (error) {
        console.log('false 2');
        console.log('catch', error);
        const message = error.message ? error.message : ERRORS.LISTED;
        errorRes(res, error, message, file);
    }
    }

    exports.updateProductStock = async (productId, quantityOrdered) => {
        console.log('Updating stock for Product ID:', productId, 'Ordered Quantity:', quantityOrdered);
        let query = {};
        query.where = {id: productId};
        // Fetch the current product details
        let product = await commonService.findOne(db.product, query);
        console.log('Fetched product:', product);
      
        if (product) {
          const newQuantity = product.quantity - quantityOrdered;
      
          console.log('Current Quantity:', product.quantity, 'New Quantity:', newQuantity);
      
          if (newQuantity >= 0) {
            await commonService.update(db.product, {
              where: { id: productId },
              body: { quantity: newQuantity }, // Update quantity
            });
            console.log('Stock updated successfully for Product ID:', productId);
          } else {
            throw new Error('Not enough stock available');
          }
        } else {
          throw new Error('Product not found');
        }
      };
      