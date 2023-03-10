'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Sector, {
        as: 'sector',
        foreignKey: 'sector_name'
      });
    }
  }
  Company.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    ceo: DataTypes.STRING,
    sector_name: DataTypes.STRING,
    cpi: DataTypes.STRING,
    cf: DataTypes.STRING,
    mau: DataTypes.STRING,
    roic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};