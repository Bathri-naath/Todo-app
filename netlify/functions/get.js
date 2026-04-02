const connectDB = require("./db")
const TodoModel = require("./Todo")

exports.handler = async () => {
  try {
    await connectDB()
    const todos = await TodoModel.find()

    return {
      statusCode: 200,
      body: JSON.stringify(todos)
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}