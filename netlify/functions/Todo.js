const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
  task: String,
  done: {
    type: Boolean,
    default: false
  }
})

module.exports =
  mongoose.models.todos || mongoose.model("todos", TodoSchema)