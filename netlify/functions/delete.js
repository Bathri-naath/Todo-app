const connectDB = require("./db")
const TodoModel = require("./Todo")

exports.handler = async (event) => {
  try {
    await connectDB()

    const id = event.queryStringParameters.id

    const deletedTodo = await TodoModel.findByIdAndDelete(id)

    return {
      statusCode: 200,
      body: JSON.stringify(deletedTodo)
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}