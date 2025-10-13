"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Attendance, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.ENUM("ADMIN", "SUPER_ADMIN", "STAFF"),
      badge_number: {
        type: DataTypes.INTEGER,
        unique: {
          args: true,
          msg: "Badge number must be unique.",
        },
      },
      deletedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "User",
    }
  );
  return User;
};
