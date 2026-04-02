import React, { useState } from 'react'
import axios from 'axios'
import API from './api'

const Create = () => {
  const [task, setTask] = useState('')
  const handleAdd = () => {
    if (!task.trim()) return

    axios.post(`${API}/add`, {task})
    .then(() => {
      setTask('')
      fetchTodos()
    })
    .catch(err => console.log(err))
  }
  return (
    <div className='py-6 flex justify-center'>
        <input
        className='border border-black placeholder-zinc-700'
        placeholder='Enter task'
        type="text" onChange={(e) => setTask(e.target.value)} />
        <button 
        className='border border-black bg-black text-white' 
        type="button"
        onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create