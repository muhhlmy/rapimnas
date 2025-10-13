const { cekKta } = require("../controllers/kta");

const kta = require("express").Router();

kta.post('/', cekKta)

module.exports = kta;