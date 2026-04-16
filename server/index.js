const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const TodoModel = require ('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/todoapp")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

app.get ('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put ('/update', (req, res)=> {
    const {id} = req.query;
    TodoModel.findById(id)
    .then(todo => {
        TodoModel.findByIdAndUpdate(id, {done: !todo.done})
        .then(result => res.json(result))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
})

app.put('/edit', async (req, res) => {
  try {
    const { id } = req.query
    const { task } = req.body

    if (!id || !task) {
      return res.status(400).json({ error: "ID and task required" })
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    )

    res.json(updatedTodo)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete ('/delete', (req,res)=> {
    const {id} = req.query;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})