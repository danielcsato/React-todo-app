import React, { useContext, useState, useEffect } from 'react';
import '../assets/TodoList.scss';
import Todo from './Todo';
import axios from 'axios';

import { BASE_URL } from '../helpers/util';
import { TodoContext } from '../context/context';

const TodoList = () => {
  // eslint-disable-next-line
  const [active, setActive] = useState(true);
  const { setTodos, todos } = useContext(TodoContext);

  const getTodos = () => {
    axios
      .get(`${BASE_URL}/api/todo`)
      .then((res) => setTodos(res.data), console.log('TODOS DOWNLOADED'))
      .catch((err) => console.log('REQUEST FAILED', err));
  };

  // TODO refresh page on new todo added
  useEffect(() => getTodos(), []);

  return (
    <>
      {todos.length !== 0 ? (
        <div className='todoList'>
          <div className='buttons'>
            <button onClick={() => setActive(true)}>Active</button>
            <button onClick={() => setActive(false)}>Completed</button>
          </div>
          <div className='todos'>
            <ul>
              {todos
                .filter((t) => t.isDone !== active)
                .map((t) => {
                  return (
                    <li key={t.id}>
                      <Todo name={t.title} id={t.id} />
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      ) : (
        <div className='todoList'>
          <h3>No todo left</h3>
        </div>
      )}
    </>
  );
};

export default TodoList;
