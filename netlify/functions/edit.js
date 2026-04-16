const connectDB = require("./db")
const TodoModel = require("./Todo")
const { success, error, options, badRequest } = require("./cors")

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return options()

  try {
    await connectDB()

    const id = event.queryStringParameters?.id
    const { task } = JSON.parse(event.body)

    if (!id || !task) return badRequest("ID and task required")

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    )

    return success(updatedTodo)
  } catch (err) {
    return error(err)
  }
}