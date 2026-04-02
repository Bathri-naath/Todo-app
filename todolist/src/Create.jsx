import React, { useState } from 'react'
import axios from 'axios'
import API from './api'

const Create = ({ fetchTodos }) => {
  const [task, setTask] = useState('')

  const handleAdd = async () => {
    if (!task.trim()) return

    try {
      await axios.post(`${API}/add`, { task })
      setTask('')
      fetchTodos()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex justify-center gap-3">
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border border-gray-400 rounded-md px-4 py-2 w-72 outline-none"
      />

      <button
        onClick={handleAdd}
        className="bg-black text-white px-5 py-2 rounded-md"
      >
        Add
      </button>
    </div>
  )
}

export default Create