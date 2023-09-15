import { useState } from 'react'
import styles from '../styles/Todos.module.css'

function Todos() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Create repository', completed: false },
    { id: 2, text: 'Design mock-up', completed: false },
    { id: 3, text: 'Setup project', completed: false },
    { id: 4, text: 'Deploy app', completed: false },
  ])
  return (
    <div className={styles.grid}>
      <header>
        <h1>To-Do List</h1>
      </header>
      <div className={styles.content}>
        <button className={styles.button}>Add To-Do</button>
        <ul className={styles.todos}>

          {
            todos.map(todo => (
              <li key={todo.id} className={styles.todo}>
                <input type="checkbox" />
                <span>{todo.text}</span>
                <button className={styles.button}>Delete</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Todos
