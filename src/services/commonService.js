// Insert only one record
exports.insertOne = async (model, query) => {
  try {
    return await model.create(query);
  } catch (error) {
    throw error;
  }
};

exports.FindOrInsertOne = async (model, query, where) => {
  try {
    return await model.findOrCreate({
      where: where,
      defaults: query
    });
  } catch (error) {
    throw error;
  }
};

/*TableName.findAll({
  where: sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '=', '2018-11-07')
})

const [user, created] = await User.findOrCreate({
  where: { username: 'sdepold' },
  defaults: {
    job: 'Technical Lead JavaScript'
  }
});
*/
// Insert array of records into a table
exports.insertMany = async (model, query) => {
  try {
    return await model.bulkCreate(query);
  } catch (error) {
    throw error;
  }
};

// Find records or create a record
exports.findOrCreate = async (model, query) => {
  try {
    return await model.findOrCreate(query.body);
  } catch (error) {
    throw error;
  }
};

// Find only one record
exports.findByPk = async (model, query) => {
  try {
    return await model.findByPk(query);
  } catch (error) {
    throw error;
  }
};

// Find only one record
exports.findOne = async (model, query) => {
  try {
    return await model.findOne({
      where: query.where,
      include: query.include,
      attributes: query.attributes,
      raw: true,
    });
  } catch (error) {
    throw error;
  }
};

// Find all the records
exports.findAll = async (model, query) => {
  try {
    return await model.findAll({
      where: query.where,
      include: query.include,
      attributes: query.attributes,
      group: query.group,
      order: query.order,
      raw: true,
    });
  } catch (error) {
    throw error;
  }
};

// Find all the records
exports.findAllNew = async (model, refModel, query) => {
  try {
    console.log('hello', 'refModel => ', refModel);
    return await model.findAll({
      where: query.where,
      //include: [refModel],
      include: [{// Notice `include` takes an ARRAY
        model: refModel
      }],
      /*include: [{
        model: refModel,
        as: 'visitorLogs'
    }],*/
      attributes: query.attributes,
      group: query.group,
      order: query.order,
      raw: true,
    });
  } catch (error) {
    throw error;
  }
};

exports.findAllAttendedCount = async (model, query) => {
  try {
    return await model.findAll({
      where: {
        udise: query.udise_code
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.findAllAttended = async (model, query) => {
  try {
    return await model.findAll({
      where: {
        udise: query.udise,
        Class: query.Class
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.findAllAttended1 = async (model, query, filterColumn, filterValue) => {
  try {
    return await model.findAll({
      where: {
        udise: query.udise,
        Class: query.Class,
        filterColumn: filterValue,
      },
    });
  } catch (error) {
    throw error;
  }
};

//find records by range
exports.findByRange = async (model, query) => {
  try {
    console.log(query.where)
    return await model.findAll({
      where: query.where,
      include: query.include,
      attributes: query.attributes,
      raw: true,
    });
  } catch (error) {
    throw error;
  }
};

// Find and count records
exports.findAndCountAll = async (model, query) => {
  try {
    query.offset = parseInt(query.offset) || 0;
    query.limit = parseInt(query.limit) || 15;
    query.where = query.where;
    return await model.findAndCountAll(query);
  } catch (error) {
    throw error;
  }
};

// Hard delete "force=true" or Soft delete "force=false"
exports.delete = async (model, query) => {
  try {
    query.force = query.force || false;
    return await model.destroy(query);
  } catch (error) {
    throw error;
  }
};

// Restore soft deleted data
exports.restore = async (model, query) => {
  try {
    return await model.restore(query);
  } catch (error) {
    throw error;
  }
};

// Update records
exports.update = async (model, query) => {
  try {
    return await model.update(query.body, {
      returning: true,
      where: query.where,
      plain: true,
    });
  } catch (error) {
    throw error;
  }
};

// Increment records
exports.increment = async (model, query) => {
  try {
    const list = await model.findAll();
    if (list.length == 0) {
      await model.create({ count: 1 });
    } else {
      await model.increment({ count: +1 }, { where: { id: list[0].id } });
    }
    return list;
  } catch (error) {
    throw error;
  }
};


exports.findAllAttendedWithFilter = async (model, query, column, value) => {
  try {
    return await model.findAll({
      where: {
        udise: query.udise,
        Class: query.Class
      },
      order: [
        [column, "ASC"],
      ],
    });
  } catch (error) {
    throw error;
  }
};


exports.updateProductStock1 = async(productId, quantityOrdered) => {
  try {
  console.log('productID ', productId, ' Qty', quantityOrdered);
  // Fetch the current product details
  let product = await commonService.findOne(db.product, { id: productId });
  console.log('product ', product);
  if (product) {
      const newQuantity = product.quantity - quantityOrdered; // Adjust this according to your stock field
      console.log('Qty,', product.quantity, 'New ', newQuantity);
      let query = {
          where: {
              id: productId
          },
          body: {
              quantity: newQuantity 
          }
      }
      if (newQuantity >= 0) {
          await commonService.update(db.product, query);
          product = {}
      } else {
          throw new Error('Not enough stock available');
      }
  } else {
      throw new Error('Product not found');
  }
} catch (error) {
  throw error;
}
};

exports.addOrder = async (req, res) => {
  try {
    let orderQuery;

    console.log('Processing order...');

    if (req.body.orderBy && req.body.addressId) {
      console.log('Valid order input');

      orderQuery = {
        orderBy: req.body.orderBy,
        totalPrice: req.body.totalPrice,
        quantity: req.body.quantity,
        addressId: req.body.addressId,
        products: req.body.products,
      };

      const orderResults = await commonService.insertOne(db.order, orderQuery);
      console.log('Order Results:', orderResults);

      // Iterate over each product in the order
      for (const product of req.body.products) {
        console.log('Processing product:', product);

        const productId = product.productId;
        const quantityOrdered = product.quantity;

        // Make sure to await each call to update the product stock
        await this.updateProductStock(productId, quantityOrdered);
      }

      successRes(res, orderResults, SUCCESS.CREATED);
    } else {
      throw new Error('Please provide valid order inputs');
    }
  } catch (error) {
    console.log('Error:', error);
    const message = error.message ? error.message : ERRORS.LISTED;
    errorRes(res, error, message, file);
  }
};

exports.updateProductStock = async (productId, quantityOrdered) => {
  console.log('Updating stock for Product ID:', productId, 'Ordered Quantity:', quantityOrdered);

  // Fetch the current product details
  let product = await commonService.findOne(db.product, { id: productId });
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
