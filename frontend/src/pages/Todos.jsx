import { faCalendar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

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
          title: todo.title,
          completed: completed,
          dueDate: dueDate
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
        title: '',
        completed: false
      });
    }
  };

  const handleDatePickerClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };

  return (
    <div className={styles.grid}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>To-Do List</h1>
        </header>
        <div className={styles.content}>
          <button className={`${styles.button} ${styles.bigButton}`} onClick={handleSetShowAddTodo}>
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;
            Add new to-do
          </button>
          {
            showAddTodo && (
              <form className={styles.form} onSubmit={handleSubmit}>
                <fieldset className={styles.fieldset}>
                  <input type="checkbox" name='completed' className={styles.checkbox} value={completed} onChange={() => setCompleted(true)} />
                  <input type="text" name='title' className={styles.input} value={todo.title} onChange={handleChange} autoFocus />
                  <FontAwesomeIcon className={styles.icon} icon={faCalendar} onClick={handleDatePickerClick} />
                </fieldset>
                {
                  showDatePicker && (
                    <div className={styles.datePicker}>
                      <input
                        type="datetime-local"
                        name='dueDate'
                        value={dueDate}
                        onChange={handleDateChange}
                      /* onChange={handleChange} */
                      />
                    </div>
                  )}
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
    </div>
  )
}

export default Todos
