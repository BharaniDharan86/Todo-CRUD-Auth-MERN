const express = require("express");
const userRouter = require("./routes/userRoutes");
const todoRouter = require("./routes/todoRoutes");
const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

module.exports = app;
