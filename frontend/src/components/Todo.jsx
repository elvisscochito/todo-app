import { apiUrlPrefixLocal } from '../config/apiUrlPrefix';
import styles from './Todo.module.css';

const Todo = ({ todo, todos, setTodos }) => {

  const removeTodo = async () => {
    try {
      const response = await fetch(`${apiUrlPrefixLocal}/todo/${todo._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          removed: true
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setTodos(todos.filter(todo => todo._id !== data._id));
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={styles.todo}>
      <input type="checkbox" />
      <span>{todo.title}</span>
      <button className={styles.button} onClick={removeTodo}>Delete</button>
    </li>
  )
}

export default Todo
