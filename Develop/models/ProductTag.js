const { Model, DataTypes, INTEGER } = require('sequelize');
const { Product } = require('.');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_Id: {
      type: INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    tag_id: {
      type: INTEGER,
      references: {
        model: 'Tag',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
