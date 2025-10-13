const { Participant, File, sequelize, Temp } = require("../models");
module.exports = class BadgeController {
  static async checkPengurusBadge(req, res, next) {
    try {
        console.log("masuk checkPengurusBadge");
        
        const { id } = req.params;
        //find participant by id and include photo
        const findParticipant = await Participant.findOne({
          where: { id: id },
          include: [
            {
              model: File,
              attributes: ["data"],
            },
          ],
        });
        console.log(findParticipant, "ini findParticipant");
        if (!findParticipant) {
          throw { name: "NotFound", message: "Participant not found" };
        }
        return res.status(200).json(findParticipant);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};