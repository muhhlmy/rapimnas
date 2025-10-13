const { getSettings, updateSettings } = require("../controllers/settings");

const setting = require("express").Router();

setting.get("/", getSettings);
setting.put("/:id", updateSettings);

module.exports = setting;
