const express = require("express");
const todoController = require("../controller/todoController");
const userController = require("../controller/userController");
const todoRoutes = express.Router();

todoRoutes.route("/").get(userController.protect, todoController.getAllTodo);

todoRoutes.route("/").post(userController.protect, todoController.createTodo);

module.exports = todoRoutes;
