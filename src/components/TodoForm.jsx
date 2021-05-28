import React, { useContext, useState } from 'react';
import '../assets/TodoForm.scss';

import { TodoContext } from '../context/context';

const TodoForm = () => {
  const [todo, setTodo] = useState('');
  const [description, setDescription] = useState('');
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(todo, description);
    setTodo('');
    setDescription('');
  };

  return (
    <div className='todoForm' onSubmit={handleSubmit}>
      <form>
        <input
          required
          type='text'
          placeholder='Todo name'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        ></input>
        <input
          required
          type='text'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button type='submit'>Add Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
