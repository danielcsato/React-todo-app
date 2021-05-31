import React, { useContext, useEffect } from 'react';
import '../assets/TodoList.scss';
import Todo from './Todo';

import { getTodos } from '../helpers/api';
import { TodoContext } from '../context/context';

const TodoList = () => {
  const { todos, active, setTodos } = useContext(TodoContext);

  // TODO refresh page on new todo added
  useEffect(() => getTodos(setTodos), []);

  return (
    <>
      <div className="todoList">
        <div className="todos">
          <ul>
            {todos
              .filter((todo) => todo.isDone !== active)
              .map(({ id, title }) => {
                return (
                  <li key={id}>
                    <Todo name={title} id={id} />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;
