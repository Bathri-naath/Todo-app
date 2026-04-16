const connectDB = require("./db")
const TodoModel = require("./Todo")
const { success, error, options } = require("./cors")

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return options()

  try {
    await connectDB()
    const todos = await TodoModel.find()

    return success(todos)
  } catch (err) {
    return error(err)
  }
}