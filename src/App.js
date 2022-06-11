import React, { useState, useEffect, useReducer } from "react";
import { TodoList } from "./TodoList";
import { Context } from "./context";
import reducer from "./reducer";
import { Btn } from "./Btn";
import 'materialize-css'

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {

  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos') || '[]'))

  const [count, setCount] = useState(0)
  const [todoTitle, setTodoTitle] = useState('')
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state))
  }, [state])

  useEffect(() => {
    setCount(0)
    state.map(todo => {
      if (!todo.completed) {
        setCount(prevCount => prevCount + 1);
      }
    })
  }, [state])

  const addTodo = e => {
    if (e.key === 'Enter' && todoTitle !== '') {
      dispatch({
        type: 'add',
        payload: todoTitle
      })
      setTodoTitle('')
    }
  }

  return (
    <Context.Provider value={{ dispatch }}>
      <div className="container">
        <div>
          <div className="top">
            <h1>Todo App</h1>
            <span>{count} items left</span>
          </div>
          <div className="btns">
            {FILTER_NAMES.map(name => (
              <Btn
                key={name}
                name={name}
                isPressed={name === filter}
                setFilter={setFilter}
              />
            ))}
          </div>
        </div>
        <div className="input-field">
          <input
            type="text"
            value={todoTitle}
            onChange={e => setTodoTitle(e.target.value)}
            onKeyPress={addTodo}
          />
          <label>Todo name</label>
        </div>

        {state.filter(FILTER_MAP[filter]).map(task => {
          return (
            <TodoList
              id={task.id}
              title={task.title}
              completed={task.completed}
              key={task.id}
            />)
        })}
      </div>
    </Context.Provider>
  );
}

export default App;