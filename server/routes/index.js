const routes = require("express").Router();

routes.use("/participants", require("./participant"));
routes.use("/kta", require("./kta"));
routes.use("/rooms", require("./room"));
routes.use("/events", require("./event"));
routes.use("/users", require("./user"));
routes.use("/settings", require("./setting"));
routes.use("/badges", require("./badge"));

module.exports = routes;