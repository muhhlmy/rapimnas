const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/event");

const event = require("express").Router();

event.post("/", createEvent);
event.get("/", getAllEvents);
event.get("/:id", getEventById);
event.put("/:id", updateEvent);
event.delete("/:id", deleteEvent);

module.exports = event;
