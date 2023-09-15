import { useEffect, useState } from 'react';
import Todo from '../components/Todo';
import { apiUrlPrefixLocal } from '../config/apiUrlPrefix';
import styles from '../styles/Todos.module.css';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    title: ''
  });
  const [showAddTodo, setShowAddTodo] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${apiUrlPrefixLocal}/todos`);
        const data = await response.json();
        setTodos(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrlPrefixLocal}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: todo.title
        }),
      });

      const data = await response.json();
      console.log(data);

      handleAddTodo(data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetShowAddTodo = () => {
    setShowAddTodo(!showAddTodo);
  };

  const handleAddTodo = (todo) => {
    if (!todo.title) {
      return;
    } else {
      setTodos([...todos, todo]);
      setTodo({
        title: ''
      });
    }
  };

  return (
    <div className={styles.grid}>
      <header>
        <h1>To-Do List</h1>
      </header>
      <div className={styles.content}>
        <button className={styles.button} onClick={handleSetShowAddTodo}>Add To-Do</button>
        {
          showAddTodo && (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input type="text" name='title' value={todo.title} onChange={handleChange} />
              <button type='submit' className={styles.button}>Add</button>
            </form>
          )
        }
        <ul className={styles.todos}>
          {
            todos.map(todo => (
              <Todo key={todo._id} todo={todo} todos={todos} setTodos={setTodos} />
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Todos
