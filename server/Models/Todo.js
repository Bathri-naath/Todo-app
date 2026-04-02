const mongoose = require ('mongoose')

const TodoSchema = new mongoose.Schema({
    task: String, 
    done: {
        type: Boolean,
        default: false
    }
})

const TodoModel = new mongoose.model("todos", TodoSchema)
module.exports = TodoModel