"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Counter extends Model {
    static associate(models) {
      // define association here
    }
  }
  Counter.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      code: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Counter",
    }
  );
  return Counter;
};
