const { User, sequelize, Counter } = require("../models");
module.exports = class UserController {
  static async createUser(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, email, role } = req.body;
      const findUser = await User.findOne({ where: { email } });
      if (findUser) {
        throw {
          name: "AlreadyExists",
          message: "User with this email already exists.",
        };
      }
      let badge_number = 0;
      const findCounter = await Counter.findOne({ where: { code: 1 } });
      if (findCounter) {
        badge_number = findCounter.value + 1;
        await findCounter.update({ value: badge_number }, { transaction: t });
      }
      const user = await User.create(
        { name, email, role, badge_number },
        { transaction: t }
      );
      await t.commit();
      return res.status(201).json({
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      next(error);
      await t.rollback();
    }
  }
  static async getAllUsers(req, res, next) {
    try {
      const { page, search, filter } = req.query;
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
            { email: { [Op.iLike]: `%${search}%` } },
            { role: { [Op.iLike]: `%${search}%` } },
            { badge_number: search },
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
      const users = await User.findAndCountAll(paramsquery);
      const result = {
        lastPage: Math.ceil(users.count / limit),
        currentPage: offset,
        dataPerPage: limit,
        count: users.count,
        startIndex: limit * (offset - 1),
        endIndex: limit * offset,
        rows: users.rows,
      };
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      });
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }
      res.status(200).json({
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateUser(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { name, email, role } = req.body;
      const findUser = await User.findByPk(id);
      if (!findUser) {
        throw { name: "NotFound", message: "User not found" };
      }
      await findUser.update(
        {
          name: name ? name : findUser.name,
          email: email ? email : findUser.email,
          role: role ? role : findUser.role,
        },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json({
        message: "User updated successfully",
        data: findUser,
      });
    } catch (error) {
      console.log(error);
      next(error);
      await t.rollback();
    }
  }
  static async deleteUser(req, res, next) {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const findUser = await User.findByPk(id);
        if (!findUser) {
          throw { name: "NotFound", message: "User not found" };
        }
        await User.destroy({ where: { id } });
        await t.commit();
        return res.status(200).json({
          message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error);
        next(error);
        await t.rollback();
    }
  }
};
