import { useContext, useState } from 'react';
import '../assets/TodoForm.scss';

import { TodoContext } from '../context/context';
import { createTodo } from '../helpers/api';

const TodoForm = () => {
  const [todoName, setTodoName] = useState('');
  const { todos } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todos.some((todo) => todo.title === todoName)) {
      alert('Name already exists');
    } else {
      createTodo(todoName);
      setTodoName('');
    }
  };

  return (
    <div className="todoForm">
      <form onSubmit={handleSubmit}>
        <input
          className="todoName"
          required
          type="text"
          placeholder="Todo name"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <button className="submitBtn" type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
