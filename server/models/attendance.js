"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      Attendance.belongsTo(models.Event, { foreignKey: "event_id" });
      Attendance.belongsTo(models.User, { foreignKey: "user_id" });
      Attendance.belongsTo(models.Participant, {
        foreignKey: "participant_id",
      });
    }
  }
  Attendance.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      event_id: DataTypes.UUID,
      user_id: DataTypes.UUID,
      participant_id: DataTypes.UUID,
      deletedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
