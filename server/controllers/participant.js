const { checkKta } = require("../helpers/checkKta");
const { checkMatchOfName } = require("../helpers/checkName");
const { processFile, updateAndDestroyFiles } = require("../helpers/variable");
const { Participant, sequelize, Temp } = require("../models");
const { sendEmailConfirmationPra } = require("../composables/pra-confirmationEmail");
const { Op } = require("sequelize");

module.exports = class ParticipantController {
  static async createParticipant(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        position,
        kta,
        email,
        phone,
        category,
        is_de,
        is_kombil,
        is_registered,
        gender,
      } = req.body;
      const id = req.body.id ? req.body.id : null;
      console.log(id, "ini id dri body harusnya");
      const name = req.body.name ? req.body.name : null;
      const photo = req.files ? await processFile(req.files.photo, t) : null;
      const mandat = req.files ? await processFile(req.files.mandat, t) : null;
      let institution = req.body.institution
        ? req.body.institution
        : position.toUpperCase().split("KETUM")[1]
        ? position.toUpperCase().split("KETUM")[1].trim()
        : position.toUpperCase().split("KETUA UMUM")[1]
        ? position.toUpperCase().split("KETUA UMUM")[1].trim()
        : null;
      console.log(req.body, "ini req.bodyyyyy");
      console.log(req.files, "ini req.files");
      let kta_name = null;
      if (kta) {
        const response = await checkKta(kta, next);
        if (response.status && response.status !== false) {
          kta_name = response.name;
        } else {
          throw { name: "KTATrouble", message: response.message };
        }
      }
      const findTemp = await Temp.findOne({ where: { kta: kta } });
      const idProv = findTemp ? findTemp.id_prov : id ? id : null;
      const genderr = findTemp ? findTemp.gender : gender ? gender : null;
      const institutionProv = findTemp ? findTemp.position_prov : institution;
      console.log(idProv, "ini id dari tempttttttttttttttttttttttttttttt");

      let data = {
        id: idProv,
        name,
        position,
        kta,
        kta_name,
        email,
        phone,
        institution: institutionProv,
        category,
        is_de,
        is_kombil,
        is_registered,
        photo,
        mandat,
        gender: genderr,
      };
      const findParticipant = await Participant.findOne({
        where: { kta: kta, deletedAt: null },
      });
      console.log(findParticipant, "ini find participantttttttttttttttttt");
      let newParticipant = null;
      if (findParticipant) {
        if (findParticipant.name) {
          const checkName = checkMatchOfName(name, findTemp.name_prov, next);
          console.log(checkName, "ini check name dari participant");
          if (checkName) {
            newParticipant = await findParticipant.update(data, {
              transaction: t,
            });
          } else {
            throw {
              name: "AlreadyExists",
              message: "KTA already registered or name mismatch.",
            };
          }
        } else {
          throw {
            name: "AlreadyExists",
            message: "KTA already registered or name mismatch.",
          };
        }
      } else {
        newParticipant = await Participant.create(data, { transaction: t });
      }
      if (newParticipant && findTemp) {
        await Temp.destroy({ where: { kta: kta } }, { transaction: t });
      }
      await t.commit();
      //ini nanti kirim email ke peserta untuk informasi nunggu approval admin
      await sendEmailConfirmationPra(name, email, institution, newParticipant.code_number);
      return res.status(201).json({
        status: "success",
        data: newParticipant,
      });
    } catch (error) {
      await t.rollback();
      console.log(error);
      next(error);
    }
  }
  static async readParticipantById(req, res, next) {
    try {
      const { id } = req.params;
      const participant = await Participant.findByPk(id);
      if (!participant) {
        throw { name: "NotFound", message: "Participant not found" };
      }
      return res.status(200).json(participant);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getAllParticipants(req, res, next) {
    try {
      console.log("masuk getall");
      let { search, filter, page } = req.query;
      let limit = 10;
      let offset = 1;
      let paramsquery = {
        where: { deletedAt: null },
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
      };
      if (page) {
        // console.log(page);
        page = JSON.parse(page);
        if (page.size) {
          // console.log(page.size, "ini page size");
          limit = page.size;
          paramsquery.limit = limit;
        } else {
          paramsquery.limit = limit;
        }
        if (page.number) {
          offset = page.number;
          paramsquery.offset = limit * (offset - 1);
        } else {
          paramsquery.offset = limit * (offset - 1);
        }
      }
      if (search) {
        // console.log(paramsquery.where, 'ini where');
        paramsquery.where = {
          ...paramsquery.where,
          [Op.or]: [
            // { id: search },
            { name: { [Op.iLike]: `%${search}%` } },
            { position: { [Op.iLike]: `%${search}%` } },
            { kta: { [Op.iLike]: `%${search}%` } },
            { kta_name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
            { phone: { [Op.iLike]: `%${search}%` } },
            { institution: { [Op.iLike]: `%${search}%` } },
          ],
        };
      }
      if (filter) {
        filter = JSON.parse(filter);
        for (const [key, value] of Object.entries(filter)) {
          paramsquery.where = {
            ...paramsquery.where,
            [key]: value,
          };
        }
      }
      const participants = await Participant.findAndCountAll(paramsquery);
      if (!participants) {
        throw { name: "NotFound", message: "Participants not found" };
      }
      const result = {
        lastPage: Math.ceil(participants.count / limit),
        currentPage: offset,
        dataPerPage: limit,
        count: participants.count,
        startIndex: limit * (offset - 1),
        endIndex: limit * offset,
        rows: participants.rows,
      };
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateParticipant(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const {
        name,
        position,
        kta,
        email,
        phone,
        // institution, //ini harusnya gabisa diubah klo dri prov ya
        category,
        delegate,
        is_de,
        is_kombil,
        is_registered,
        is_approved,
        is_attended,
        gender,
      } = req.body;
      const findParticipant = await Participant.findByPk(id);
      const photo = req.files
        ? await updateAndDestroyFiles(req.files.photo, findParticipant.photo, t)
        : null;
      const mandat = req.files
        ? await updateAndDestroyFiles(
            req.files.mandat,
            findParticipant.mandat,
            t
          )
        : null;
      if (!findParticipant) {
        throw { name: "NotFound", message: "Participant not found" };
      }
      let kta_name = findParticipant.kta_name;
      if (kta && kta !== findParticipant.kta) {
        const response = await checkKta(kta, next);
        if (response.status && response.status !== false) {
          kta_name = response.name;
        } else {
          throw { name: "KTATrouble", message: response.message };
        }
      }
      //ini harusnya ngejalanin flow yg sama kaya di create
      const crossCheckParticipant = await Participant.findOne({
        where: { kta: kta },
      });
      if (crossCheckParticipant) {
        //ngecek kta yg di crosscheck sm yg di get by id sama atau engga
        //kalo udah, ngecek nama 
        throw { name: "AlreadyExists", message: "KTA already registered." };
      }
      let newParticipant;
      if (findParticipant) {
        //ini harus ngecek nama yg di temp sm yg di input sama atau engga, klo sama update participant klo engga brrti create
        newParticipant = await findParticipant.update(data, { transaction: t });
      } else {
        throw { name: "NotFound", message: "Participant not found" };
        // newParticipant = await Participant.create(data, { transaction: t });
      }
      const data = {
        name: name ? name : findParticipant.name,
        position: position ? position : findParticipant.position,
        kta: kta ? kta : findParticipant.kta,
        email: email ? email : findParticipant.email,
        phone: phone ? phone : findParticipant.phone,
        institution: institution ? institution : findParticipant.institution,
        category: category ? category : findParticipant.category,
        delegate: delegate ? delegate : findParticipant.delegate,
        is_de: is_de ? is_de : findParticipant.is_de,
        is_kombil: is_kombil ? is_kombil : findParticipant.is_kombil,
        is_registered: is_registered
          ? is_registered
          : findParticipant.is_registered,
        is_approved: is_approved ? is_approved : findParticipant.is_approved,
        is_attended: is_attended ? is_attended : findParticipant.is_attended,
        photo,
        mandat,
        gender: gender ? gender : findParticipant.gender,
      };
      if (data.is_approved) {
        //ini nanti ngirim email ke peserta, link edit yg sekali pake, jangan lupa generate code_number sama nambahin badge_number
      }
      await Participant.update(data, {
        where: { id, deletedAt: null },
        transaction: t,
        // returning: true,
      });
      await t.commit();
      return res.status(200).json({
        message: "Participant updated successfully",
      });
    } catch (error) {
      await t.rollback();
      console.log(error);
      next(error);
    }
  }
  static async deleteParticipant(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const findParticipant = await Participant.findByPk(id);
      if (!findParticipant) {
        throw { name: "NotFound", message: "Participant not found" };
      }
      await Participant.destroy({ where: { id } }, { transaction: t });
      await t.commit();
      return res.status(200).json({
        message: "Participant deleted successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
      await t.rollback();
    }
  }
  static async readParticipantByCode(req, res, next) {
    try {
      const { code } = req.params;
      const participant = await Participant.findOne({
        where: { code_number: code },
      });
      if (!participant) {
        throw { name: "NotFound", message: "Participant not found" };
      }
      return res.status(200).json(participant);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
