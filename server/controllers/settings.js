const { Setting, sequelize } = require("../models");
module.exports = class SettingsController {
  static async getSettings(req, res, next) {
    try {
      const settings = await Setting.findAll();
      res.status(200).json({
        message: "Settings retrieved successfully",
        data: settings,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateSettings(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { max_date_kta, max_date_regis } = req.body;
      const setting = await Setting.findByPk(id);
      if (!setting) {
        throw { name: "NotFound", message: "Setting not found" };
      }
      await setting.update(
        { max_date_kta, max_date_regis },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json({
        message: "Setting updated successfully",
        data: setting,
      });
    } catch (error) {
      console.log(error);
      next(error);
      await t.rollback();
    }
  }
};
