'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CompanyTag.init({
    tag_name: DataTypes.STRING,
    company_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompanyTag',
  });
  return CompanyTag;
};