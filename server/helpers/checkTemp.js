const { Temp } = require("../models");
const checkTemp = async (id, kta, position, name, gender, role, t, next) => {
  try {
    const checkTemp = await Temp.findOne({
      where: { id_prov: id },
    });
    if (checkTemp) {
      await Temp.update(
        {
          kta: kta,
          position_prov: position,
          name_prov: name,
          gender: gender,
          role: role,
        },
        { where: { id_prov: id }, transaction: t }
      );
    } else {
      await Temp.create(
        {
          kta: kta,
          position_prov: position,
          id_prov: id,
          name_prov: name,
          gender: gender,
          role: role,
        },
        { transaction: t }
      );
    }
  } catch (error) {
    next(error);
    await t.rollback();
  }
};
module.exports = {
  checkTemp,
};
