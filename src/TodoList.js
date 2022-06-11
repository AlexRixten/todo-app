import React from 'react'
import {TodoItem} from './TodoItem'

export const TodoList = (task) => {
  return (
    <ul>
      <TodoItem key={task.id} {...task} />
    </ul>
  )
}
