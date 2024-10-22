const Sequelize = require("sequelize");
const { schema, utils } = require("../src/models/index.model");

const sequelize = new Sequelize(process.env.DB_URI, {
    logging: false,
    define: {
        timestamps: true,
        freezeTableName: true,
    },
    dialect: 'mysql'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.login = require("../src/models/login/login.model.js")(sequelize, Sequelize);
db.user = require("../src/models/user/user.model.js")(sequelize, Sequelize);
db.product = require("../src/models/order/product.model.js")(sequelize, Sequelize);
db.order = require("../src/models/order/order.model.js")(sequelize, Sequelize);
db.address = require("../src/models/order/address.model.js")(sequelize, Sequelize);
db.cart = require("../src/models/order/cart.model.js")(sequelize, Sequelize);


db.order.belongsTo(db.login, { as: 'orderByRef', foreignKey: 'orderBy' });
db.order.belongsTo(db.address, { as: 'addressIdRef', foreignKey: 'addressId' });
db.cart.belongsTo(db.product, { as: 'productIdRef', foreignKey: 'productId' });
db.cart.belongsTo(db.login, { as: 'loginIdRef', foreignKey: 'loginId' });



schema.forEach(x => {
    console.log(x.model);
     if(x.model == 'login' || x.model == 'user' || x.model == 'product' || x.model == 'order' ||
        x.model == 'address' || x.model == 'cart'
     ){ 
        console.log('if ', x.table);
    }
    else {
        db[x.model] = sequelize.define(x.table, x.path.schema, x.path.utils);
        db[x.model].associate = x.path.associate;
    }
});


Object.keys(db).forEach(function (modelName) {
    if (modelName != 'Sequelize' && modelName != 'sequelize') {
        if (db[modelName].associate) {
            db[modelName].associate(db[modelName], db)
        }
    }
})

module.exports = db;