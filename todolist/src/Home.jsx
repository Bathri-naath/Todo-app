import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Create from './Create'
import API from './api'
import { BsCircleFill, BsCheckCircleFill, BsTrash } from 'react-icons/bs'

const Home = () => {
  const [todos, setTodos] = useState([])

  const fetchTodos = () => {
    axios.get(`${API}/get`)
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleEdit = (id) => {
    axios.put(`${API}/update?id=${id}`)
      .then(() => {
        fetchTodos()
      })
      .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete(`${API}/delete?id=${id}`)
      .then(() => {
        fetchTodos()
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h2 className='py-9 flex justify-center font-bold text-2xl'>
        Reminders
      </h2>

      <Create fetchTodos={fetchTodos} />

      {todos.length === 0 ? (
        <div className='flex justify-center'>
          <h2>Nothing to do!</h2>
        </div>
      ) : (
        todos.map(todo => (
          <div key={todo._id} className='flex justify-center items-center mb-3'>
            <div className='w-auto flex justify-center gap-5 bg-black text-white rounded px-4 py-3'>
              <div className='flex gap-5 items-center'>
                {todo.done ? (
                  <BsCheckCircleFill
                    className='cursor-pointer'
                    onClick={() => handleEdit(todo._id)}
                  />
                ) : (
                  <BsCircleFill
                    className='cursor-pointer'
                    onClick={() => handleEdit(todo._id)}
                  />
                )}

                <p className={todo.done ? "line-through" : ""}>
                  {todo.task}
                </p>

                <BsTrash
                  className='cursor-pointer'
                  onClick={() => handleDelete(todo._id)}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Home