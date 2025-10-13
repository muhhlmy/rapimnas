"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Participants", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.STRING,
      },
      badge_number: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      kta: {
        type: Sequelize.STRING,
        unique: true,
      },
      kta_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      institution: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.ENUM(
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
          "MEDIA"
        ),
      },
      gender:{
        type: Sequelize.ENUM("male", "female")
      },
      photo: {
        type: Sequelize.UUID,
        references: {
          model: "Files",
          key: "id",
        },
      },
      mandat: {
        type: Sequelize.UUID,
        references: {
          model: "Files",
          key: "id",
        },
      },
      delegate: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      code_number: {
        type: Sequelize.STRING,
      },
      is_de: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_kombil:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_registered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_attended: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      expiry_code: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Participants");
  },
};
