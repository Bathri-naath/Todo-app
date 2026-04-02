import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Create from './Create'
import API from './api'
import { BsCircleFill, BsCheckCircleFill, BsTrash } from 'react-icons/bs'

const Home = () => {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    try {
      const result = await axios.get(`${API}/get`)
      setTodos(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleEdit = async (id) => {
    try {
      await axios.put(`${API}/update?id=${id}`)
      fetchTodos()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/delete?id=${id}`)
      fetchTodos()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h2 className="py-6 flex justify-center font-bold text-3xl">
        Reminders
      </h2>

      <Create fetchTodos={fetchTodos} />

      {todos.length === 0 ? (
        <div className="flex justify-center mt-8">
          <h2 className="text-gray-600 text-lg">Nothing to do!</h2>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 mt-8">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="w-full max-w-md bg-black text-white rounded-lg shadow-md px-5 py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {todo.done ? (
                  <BsCheckCircleFill
                    className="cursor-pointer text-xl"
                    onClick={() => handleEdit(todo._id)}
                  />
                ) : (
                  <BsCircleFill
                    className="cursor-pointer text-xl"
                    onClick={() => handleEdit(todo._id)}
                  />
                )}

                <p className={todo.done ? 'line-through text-gray-400' : ''}>
                  {todo.task}
                </p>
              </div>

              <BsTrash
                className="cursor-pointer text-xl"
                onClick={() => handleDelete(todo._id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home