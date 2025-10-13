const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/user");

const user = require("express").Router();

user.post("/", createUser);
user.get("/", getAllUsers);
user.get("/:id", getUserById);
user.put("/:id", updateUser);
user.delete("/:id", deleteUser);

module.exports = user;
