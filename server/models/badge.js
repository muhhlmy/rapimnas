"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Badge extends Model {
    static associate(models) {
      Badge.belongsTo(models.Participant, { foreignKey: "participant_id" });
      Badge.belongsTo(models.File, { foreignKey: "photo" });
    }
  }
  Badge.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      participant_id: DataTypes.UUID,
      photo: DataTypes.UUID,
      deletedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Badge",
    }
  );
  return Badge;
};
