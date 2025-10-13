"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.hasMany(models.Attendance, { foreignKey: "event_id" });
      Event.belongsTo(models.Room, { foreignKey: "room_id" });
    }
  }
  Event.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      time_start: DataTypes.DATE,
      time_end: DataTypes.DATE,
      allowed_category: DataTypes.ARRAY(DataTypes.STRING),
      room_id: DataTypes.UUID,
      deletedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Event",
    }
  );
  return Event;
};
