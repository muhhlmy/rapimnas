"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    static associate(models) {
      Participant.belongsTo(models.File, { foreignKey: "photo" });
      Participant.belongsTo(models.File, { foreignKey: "mandat" });
      Participant.hasMany(models.Badge, { foreignKey: "participant_id" });
      Participant.hasMany(models.Attendance, { foreignKey: "participant_id" });
    }
  }
  Participant.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      position: DataTypes.STRING,
      badge_number: {
        type: DataTypes.INTEGER,
        unique: {
          args: true,
          msg: "Badge number must be unique.",
        },
      },
      kta: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "KTA must be unique.",
        },
      },
      kta_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      institution: DataTypes.STRING,
      category: DataTypes.ENUM(
        "KI",
        "KI DE",
        "KI WKUK",
        "KI WKU",
        "KI KOMTAP",
        "KI WAKOMTAP",
        "KI KABAN",
        "KI WAKABAN",
        "KI ANGGOTA_BADAN",
        "KI KAKOMBIL",
        "KI WAKOMBIL",
        "KI ANGGOTA_KOMBIL",
        "KP KETUM",
        "KP DE",
        "DE",
        "KPP",
        "ASOSIASI",
        "MEDIA",
      ),
      gender: {
        type: DataTypes.ENUM("male", "female"),
      },
      photo: DataTypes.UUID,
      mandat: DataTypes.UUID,
      delegate: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      code_number: DataTypes.STRING,
      is_de: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_kombil:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_registered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_attended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      expiry_code: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid:true,
      modelName: "Participant",
    }
  );
  return Participant;
};
