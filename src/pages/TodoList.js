import React from 'react'
import TodoItem from './TodoItem.js'

export default function TodoList({ tasks }) {
  return (
    <div>
        {tasks.map(task => {
            return <TodoItem todo={task} key={task.id}/>
        })}
    </div>
  )
}
