const connectDB = require("./db")
const TodoModel = require("./Todo")
const { success, error, options, badRequest } = require("./cors")

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return options()

  try {
    await connectDB()

    const id = event.queryStringParameters?.id
    if (!id) return badRequest("ID required")

    const deletedTodo = await TodoModel.findByIdAndDelete(id)

    return success(deletedTodo)
  } catch (err) {
    return error(err)
  }
}