import React, { useState } from 'react'
import axios from 'axios'
import Create from './Create'
import { useEffect } from 'react'
import { BsCircleFill, BsCheckCircleFill, BsTrash } from 'react-icons/bs'

const Home = () => {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])
    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/'+id)
        .then(result => {location.reload()})
        .catch(err => console.log(err))
    }
    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => {location.reload()})
        .catch(err => console.log(err))
    }

  return (
    <div>
        <h2 className='py-9 flex justify-center font-bold'>Reminders</h2>
        <Create />
        {
            todos.length === 0
            ?
            <div className='flex justify-center'><h2>Nothing to do!</h2></div>
            :
            todos.map(todo => (
                <div className='flex justify-center items-center'>
                    <div className='w-auto flex justify-center gap-5 bg-black text-white'>
                       <div className='m-3 flex gap-5'>
                        {todo.done ? 
                        <BsCheckCircleFill
                        className='cursor-pointer'
                        onClick={() => handleEdit(todo._id)} /> : 
                        <BsCircleFill
                        className='cursor-pointer'
                        onClick={() => handleEdit(todo._id)}/>
                        }
                        <p className = {todo.done ? "line-through" : ""}>{todo.task}</p>
                        <BsTrash
                        className='cursor-pointer'
                        onClick={() => handleDelete(todo._id)}/>
                       </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Home