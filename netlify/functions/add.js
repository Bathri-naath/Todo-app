const connectDB = require("./db")
const TodoModel = require("./Todo")
const { success, error, options, badRequest } = require("./cors")

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return options()

  try {
    await connectDB()

    const { task } = JSON.parse(event.body)
    if (!task) return badRequest("Task is required")

    const todo = await TodoModel.create({
      task,
      done: false
    })

    return success(todo)
  } catch (err) {
    return error(err)
  }
}