"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        id: "e3b0c442-98fc-1c14-9afb-4c4e8f3d6b7f",
        max_date_kta: "2025-12-31T17:00:00.000Z",
        max_date_regis: "2025-11-15T17:00:00.000Z",
      },
    ].map((el)=>{
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })
    await queryInterface.bulkInsert('Settings', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Settings', null, {truncate: true, cascade: true, restartIdentity: true});
  },
};
