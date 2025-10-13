const { Room, sequelize, Event } = require("../models");
module.exports = class RoomController {
  static async createRoom(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, tv_code } = req.body;
      const existingRoom = await Room.findOne({
        where: { name: name, tv_code: tv_code, deletedAt: null },
      });
      if (existingRoom) {
        throw {
          name: "Conflict",
          message: "Room with this name and TV code already exists",
        };
      }
      const room = await Room.create(
        {
          name,
          tv_code,
        },
        { transaction: t }
      );
      await t.commit();
      return res.status(201).json({
        message: "Room created successfully",
        data: room,
      });
    } catch (error) {
      await t.rollback();
      console.log(error);
      next(error);
    }
  }
  static async getAllRooms(req, res, next) {
    try {
      const { page, search } = req.query;
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
            { id: search },
            { name: { [Op.iLike]: `%${search}%` } },
            { tv_code: search },
          ],
        };
      }
      const rooms = await Room.findAndCountAll(paramsquery);
      const result = {
        lastPage: Math.ceil(rooms.count / limit),
        currentPage: offset,
        dataPerPage: limit,
        count: rooms.count,
        startIndex: limit * (offset - 1),
        endIndex: limit * offset,
        rows: rooms.rows,
      };
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getRoomById(req, res, next) {
    try {
      const { id } = req.params;
      const room = await Room.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      });
      if (!room) {
        throw { name: "NotFound", message: "Room not found" };
      }
      res.status(200).json({
        message: "Room retrieved successfully",
        data: room,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateRoom(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { name, tv_code } = req.body;
      const room = await Room.findByPk(id);
      if (!room) {
        throw { name: "NotFound", message: "Room not found" };
      }
      await Room.update(
        {
          name,
          tv_code,
        },
        { where: { id }, transaction: t }
      );
      await t.commit();
      res.status(200).json({
        message: "Room updated successfully",
      });
    } catch (error) {
      await t.rollback();
      console.log(error);
      next(error);
    }
  }
  static async deleteRoom(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const room = await Room.findByPk(id);
      if (!room) {
        throw { name: "NotFound", message: "Room not found" };
      }
      const eventRoom = await Event.findAll({ where: { room_id: id } });
      if (eventRoom.length > 0) {
        throw {
          name: "Conflict",
          message:
            "Room is associated with existing events and cannot be deleted.",
        };
      }
      await Room.destroy({ where: { id } }, { transaction: t });
      await t.commit();
      return res.status(200).json({
        message: "Room deleted successfully",
      });
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }
};
