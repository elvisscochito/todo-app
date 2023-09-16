import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { apiUrlPrefixLocal } from '../config/apiUrlPrefix';
import styles from '../styles/Todo.module.css';

const Todo = ({ todo, todos, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(todo.title);

  const toggleTodo = async () => {
    try {
      const response = await fetch(`${apiUrlPrefixLocal}/todo/${todo._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setTodos(todos.map(todo => {
          if (todo._id === data._id) {
            return data;
          }
          return todo;
        }));
      }

    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const response = await fetch(`${apiUrlPrefixLocal}/todo/${todo._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setTodos(todos.map(todo => {
          if (todo._id === data._id) {
            return data;
          }
          return todo;
        }));
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleEditableTitleChange = () => {
    setIsEditing(false);

    if (!editableTitle) {
      /* setEditableTitle(todo.title);
      return; */
      removeTodo();
    } else if (editableTitle !== todo.title) {
      updateTodo({
        title: editableTitle
      });
    }
  };

  const handleTitleChange = (e) => {
    setEditableTitle(e.target.value);
  };

  const handleEditOnClick = () => {
    setIsEditing(true);
  };

  const handleTitleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      /* e.preventDefault(); */
      handleEditableTitleChange();
    }
  };

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
      <input type="checkbox" checked={todo.completed} onChange={toggleTodo} />
      {
        isEditing ? (
          <input
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            onBlur={handleEditableTitleChange}
            onKeyDown={handleTitleOnKeyDown}
            autoFocus
          />
        ) : (
          <div className={styles.content}>
            <span
              className={todo.completed ? styles.completed : styles.title}
              onClick={handleEditOnClick}>
              {todo.title}
            </span>
            {
              todo.dueDate && (
                <span className={styles.dueDate}>
                  {
                    new Date(todo.dueDate).toLocaleTimeString('es-Es', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  }
                  ·
                  {
                    new Date(todo.dueDate).toLocaleDateString('es-Es', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })
                  }
                </span>
              )
            }
          </div>
        )
      }
      <button className={styles.button} onClick={removeTodo}>
        <FontAwesomeIcon icon={faXmark} className={styles.icon} />
      </button>
    </li>
  )
}

export default Todo
