const Todo = require("../model/todoModel");

exports.getAllTodo = async (req, res, next) => {
  const todos = await Todo.find({ user: req.userId });

  return res.status(200).json({
    status: "success",
    results: todos.length,
    todos,
  });
};

exports.createTodo = async (req, res, next) => {
  const { todo } = req.body;
  const user = req.userId;

  const newTodo = await Todo.create({ todo, user });

  return res.status(200).json({
    status: "success",
    message: "Created Successfully",
    newTodo,
  });
};
