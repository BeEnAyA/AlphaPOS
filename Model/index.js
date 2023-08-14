const dbConfig = require("../Config/db");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./admin.js")(sequelize, DataTypes);
db.product=require('./product.js')(sequelize,DataTypes);
db.sale=require('./sales.js')(sequelize,DataTypes);
db.customer=require('./customer.js')(sequelize,DataTypes);
db.item=require('./item.js')(sequelize,DataTypes);

//relation for sales
db.customer.hasMany(db.sale, { onDelete: 'CASCADE' });
db.sale.belongsTo(db.customer);

db.product.hasMany(db.sale, { onDelete: 'CASCADE' });
db.sale.belongsTo(db.product);



//relation for items (sales and product)
db.product.hasMany(db.item, { onDelete: 'CASCADE' });
db.item.belongsTo(db.product);

db.sale.hasMany(db.item, { onDelete: 'CASCADE' });
db.item.belongsTo(db.sale);



module.exports = db;