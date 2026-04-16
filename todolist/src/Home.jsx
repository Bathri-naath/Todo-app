import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Create from './Create'
import API from './api'
import {
  BsCircleFill,
  BsCheckCircleFill,
  BsTrash,
  BsPencil
} from 'react-icons/bs'

const Home = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoadingId, setActionLoadingId] = useState(null)

  const [editingId, setEditingId] = useState(null)
  const [editedTask, setEditedTask] = useState('')

  // ✅ Fetch todos (only show loader on first load)
  const fetchTodos = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true)

      const result = await axios.get(`${API}/get`)
      setTodos(result.data)
    } catch (err) {
      console.log(err)
    } finally {
      if (showLoader) setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos(true)
  }, [])

  // ✅ Toggle done (optimistic UI)
  const handleEditToggle = async (id) => {
    try {
      setActionLoadingId(id)

      // instant UI update
      setTodos(prev =>
        prev.map(todo =>
          todo._id === id ? { ...todo, done: !todo.done } : todo
        )
      )

      await axios.put(`${API}/update?id=${id}`)
    } catch (err) {
      console.log(err)
    } finally {
      setActionLoadingId(null)
    }
  }

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      setActionLoadingId(id)

      await axios.delete(`${API}/delete?id=${id}`)

      // remove from UI instantly
      setTodos(prev => prev.filter(todo => todo._id !== id))
    } catch (err) {
      console.log(err)
    } finally {
      setActionLoadingId(null)
    }
  }

  // ✅ Save edited task
  const handleUpdateTask = async (id) => {
    try {
      setActionLoadingId(id)

      await axios.put(`${API}/edit?id=${id}`, {
        task: editedTask
      })

      // update UI instantly
      setTodos(prev =>
        prev.map(todo =>
          todo._id === id ? { ...todo, task: editedTask } : todo
        )
      )

      setEditingId(null)
      setEditedTask('')
    } catch (err) {
      console.log(err)
    } finally {
      setActionLoadingId(null)
    }
  }

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') handleUpdateTask(id)
    if (e.key === 'Escape') {
      setEditingId(null)
      setEditedTask('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h2 className="py-6 flex justify-center font-bold text-3xl">
        Reminders
      </h2>

      <Create fetchTodos={() => fetchTodos(false)} />

      {/* ✅ Initial loading only */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <p className="text-gray-600 text-lg animate-pulse">
            Loading todos...
          </p>
        </div>
      ) : todos.length === 0 ? (
        <div className="flex justify-center mt-8">
          <h2 className="text-gray-600 text-lg">Nothing to do!</h2>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 mt-8">
          {todos.map((todo) => {
            const isLoading = actionLoadingId === todo._id

            return (
              <div
                key={todo._id}
                className="w-full max-w-md bg-black text-white rounded-lg shadow-md px-5 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4 w-full">

                  {/* ✅ Checkbox with spinner */}
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : todo.done ? (
                    <BsCheckCircleFill
                      className="cursor-pointer text-xl"
                      onClick={() => handleEditToggle(todo._id)}
                    />
                  ) : (
                    <BsCircleFill
                      className="cursor-pointer text-xl"
                      onClick={() => handleEditToggle(todo._id)}
                    />
                  )}

                  {/* ✅ Edit input */}
                  {editingId === todo._id ? (
                    <input
                      type="text"
                      value={editedTask}
                      onChange={(e) => setEditedTask(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, todo._id)}
                      autoFocus
                      disabled={isLoading}
                      className="text-black px-2 py-1 rounded w-full"
                    />
                  ) : (
                    <p
                      className={`flex-1 ${
                        todo.done ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {todo.task}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 ml-4">
                  {/* ✅ Save button */}
                  {editingId === todo._id ? (
                    <button
                      onClick={() => handleUpdateTask(todo._id)}
                      disabled={isLoading}
                      className="text-sm bg-green-500 px-2 py-1 rounded"
                    >
                      {isLoading ? 'Saving...' : 'Save'}
                    </button>
                  ) : (
                    <BsPencil
                      className={`text-xl ${
                        isLoading ? 'opacity-50' : 'cursor-pointer'
                      }`}
                      onClick={() => {
                        if (!isLoading) {
                          setEditingId(todo._id)
                          setEditedTask(todo.task)
                        }
                      }}
                    />
                  )}

                  {/* ✅ Delete */}
                  <BsTrash
                    className={`text-xl ${
                      isLoading ? 'opacity-50' : 'cursor-pointer'
                    }`}
                    onClick={() =>
                      !isLoading && handleDelete(todo._id)
                    }
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Home