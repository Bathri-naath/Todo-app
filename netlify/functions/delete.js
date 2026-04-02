const connectDB = require("./db")
const TodoModel = require("./Todo")

exports.handler = async (event) => {
  try {
    await connectDB()

    const id = event.queryStringParameters.id

    const todo = await TodoModel.findById(id)

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { done: !todo.done },
      { new: true }
    )

    return {
      statusCode: 200,
      body: JSON.stringify(updatedTodo)
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}