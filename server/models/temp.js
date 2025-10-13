'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Temp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Temp.init({
    kta: DataTypes.STRING,
    position_prov: DataTypes.STRING,
    id_prov: DataTypes.STRING,
    name_prov: DataTypes.STRING,
    gender: DataTypes.ENUM("male", "female"),
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Temp',
  });
  return Temp;
};