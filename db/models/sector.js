'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Company, {
        as: "companies",
        foreignKey: "sector_name"
      })
    }
  }
  Sector.init({
    name: DataTypes.STRING,
    cpi: DataTypes.INTEGER,
    cf: DataTypes.INTEGER,
    mau: DataTypes.INTEGER,
    roic: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sector',
  });
  return Sector;
};