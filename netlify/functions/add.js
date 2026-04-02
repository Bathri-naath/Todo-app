const connectDB = require("./db")
const TodoModel = require("./Todo")

exports.handler = async (event) => {
  try {
    await connectDB()

    const { task } = JSON.parse(event.body)

    const todo = await TodoModel.create({
      task,
      done: false
    })

    return {
      statusCode: 200,
      body: JSON.stringify(todo)
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}