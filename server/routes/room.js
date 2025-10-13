const { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom } = require("../controllers/room");

const room = require("express").Router();

room.post("/", createRoom);
room.get("/", getAllRooms);
room.get("/:id", getRoomById);
room.put("/:id", updateRoom);
room.delete("/:id", deleteRoom);

module.exports = room;
