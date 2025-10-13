const { Op } = require("sequelize");
const { Event, sequelize, Room } = require("../models");
module.exports = class EventController {
  static async createEvent(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let { name, time_start, time_end, allowed_category, room_id } =
        req.body;
        console.log(req.body, "ini req.body");
        if(allowed_category){
            if(typeof allowed_category === "string"){
                allowed_category = JSON.parse(allowed_category)
            }   

        }
      const findEvent = await Event.findOne({
        where: { name: name, room_id: room_id, deletedAt: null },
      });
      if (findEvent) {
        throw {
          name: "Conflict",
          message: "Event with this name and Room already exists",
        };
      }
      const event = await Event.create(
        {
          name,
          time_start,
          time_end,
          allowed_category,
          room_id,
        },
        { transaction: t }
      );
      await t.commit();
      return res.status(201).json({
        message: "Event created successfully",
        data: event,
      });
    } catch (error) {
      await t.rollback();
      console.log(error);
      next(error);
    }
  }
  static async getAllEvents(req, res, next) {
    try {
      const { search, filter, page } = req.query;
      let limit = 10;
      let offset = 1;
      let paramsquery = {
        where: { deletedAt: null },
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: Room,
            attributes: ["id", "name", "tv_code"],
          },
        ],
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
            { room_id: search },
            { allowed_category: { [Op.contains]: [search] } },
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
      console.log(paramsquery, "ini paramsquery");
      const events = await Event.findAndCountAll(paramsquery);
      console.log(events, "ini events");
      
      const result = {
        lastPage: Math.ceil(events.count / limit),
        currentPage: offset,
        dataPerPage: limit,
        count: events.count,
        startIndex: limit * (offset - 1),
        endIndex: limit * offset,
        rows: events.rows,
      };
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getEventById(req, res, next) {
    try {
      const { id } = req.params;
      const event = await Event.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: Room,
            attributes: ["id", "name", "tv_code"],
          },
        ],
      });
      if (!event) {
        throw { name: "NotFound", message: "Event not found" };
      }
      res.status(200).json({
        message: "Event retrieved successfully",
        data: event,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateEvent(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { name, time_start, time_end, allowed_category, room_id } =
        req.body;
      const event = await Event.findByPk(id);
      if (!event) {
        throw { name: "NotFound", message: "Event not found" };
      }
      await Event.update(
        {
          name: name ? name : event.name,
          time_start: time_start ? time_start : event.time_start,
          time_end: time_end ? time_end : event.time_end,
          allowed_category: allowed_category ? allowed_category : event.allowed_category,
          room_id: room_id ? room_id : event.room_id,
        },
        { where: { id }, transaction: t }
      );
      await t.commit();
      res.status(200).json({
        message: "Event updated successfully",
      });
    } catch (error) {
      await t.rollback();
      console.log(error);
      next(error);
    }
  }
  static async deleteEvent(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const event = await Event.findByPk(id);
      if (!event) {
        throw { name: "NotFound", message: "Event not found" };
      }
      await Event.destroy({ where: { id } }, { transaction: t });
      await t.commit();
      res.status(200).json({
        message: "Event deleted successfully",
      });
    } catch (error) {
      await t.rollback();
      console.log(error);
      next(error);
    }
  }
};
