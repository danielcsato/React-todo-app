import React, { useContext, useState } from 'react';
import '../assets/TodoList.scss';
import Todo from './Todo';
import { TodoContext } from '../context/context';
import { FaBlackberry } from 'react-icons/fa';

const TodoList = () => {
  const [active, setActive] = useState(true);

  const handleFilter = (filter) => {
    setActive(filter);
  };

  const { handleDelete, handleComplete, todos } = useContext(TodoContext);
  return (
    <>
      {todos.length !== 0 ? (
        <div className='todoList'>
          <div className='buttons'>
            <button onClick={() => handleFilter(true)}>Active</button>
            <button onClick={() => handleFilter(false)}>Completed</button>
          </div>
          <div className='todos'>
            <ul>
              {todos
                .filter((t) => t.isCompleted === !active)
                .map((t) => {
                  return (
                    <li key={t.id}>
                      <Todo
                        name={t.name}
                        id={t.id}
                        handleComplete={handleComplete}
                        handleDelete={handleDelete}
                        isCompleted={t.isCompleted}
                        description={t.description}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      ) : (
        <h3>No todo left</h3>
      )}
    </>
  );
};

export default TodoList;
