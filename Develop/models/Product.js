// import important parts of sequelize library
const { Model, DataTypes, DECIMAL, INTEGER } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_name: {
      type: String,
      allowNull: false,
    },
    price:  {
      type: DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      }
    },
    stock: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isAlphaNumeric: true,
      }
    },
    category_id: {
      type: INTEGER,
      References: {
        Model: 'category',
        key: 'ID',
      }
    },

  
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
