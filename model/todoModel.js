const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: ["true", "Must have the field"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isFailed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
});




const Todo = new mongoose.model("Todo", todoSchema);

module.exports = Todo;
