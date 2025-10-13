"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      { id: "148ee727-ec7e-4079-828c-4555154d5e47", code: 1, value: 0 },
      {
        id: "6d453d0d-8d69-4ff3-bed3-75a20064a104",
        code: 2,
        value: 150,
      },
    ].map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Counters", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Counters", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
