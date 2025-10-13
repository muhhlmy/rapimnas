"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      { id: "a6246cb9-9cca-4c8d-83a1-43fb150062b4", name: "Board-Pusat" },
      { id: "0d962fb9-15f9-466e-8bb9-f06c9c94ac30", name: "Board-Provinsi" },
    ].map((el)=>{
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert("Systems", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Systems", null, {truncate: true, cascade: true, restartIdentity: true});
  },
};
