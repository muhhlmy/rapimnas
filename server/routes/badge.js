const { checkPengurusBadge } = require("../controllers/badge");

const badge = require("express").Router();

badge.get("/:id", checkPengurusBadge);

module.exports = badge;
