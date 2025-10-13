const {
  createParticipant,
  getAllParticipants,
  readParticipantById,
  updateParticipant,
  deleteParticipant,
} = require("../controllers/participant");

const participant = require("express").Router();

participant.post("/", createParticipant);
participant.get("/", getAllParticipants);
participant.get("/:id", readParticipantById);
participant.put("/:id", updateParticipant);
participant.delete("/:id", deleteParticipant);

module.exports = participant;
