import React, { useContext } from 'react';
import '../assets/TodoList.scss';
import Todo from './Todo';

import { TodoContext } from '../context/context';

const TodoList = () => {
  const { todos, active, deleteTodo, handleComplete } = useContext(TodoContext);
  return (
    <>
      <div className="todoList">
        <div className="todos">
          <ul>
            {todos
              .filter((t) => (active ? t : t.isDone === true))
              .map(({ id, title, createTime, isDone, subTasks }) => {
                return (
                  <li key={id}>
                    <Todo
                      name={title}
                      id={id}
                      createTime={createTime}
                      isDone={isDone}
                      deleteTodo={deleteTodo}
                      handleComplete={handleComplete}
                      subTasks={subTasks}
                    />
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
