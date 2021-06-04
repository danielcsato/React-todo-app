import { useContext, useEffect } from 'react';
import { TodoContext } from '../context/context';

import { FaTrashAlt } from 'react-icons/fa';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

const SubTodo = ({ name, id, isDone, parentId }) => {
  const { todos, setTodos } = useContext(TodoContext);

  const handleDelete = (id, parentId) => {
    const subTasks = todos.find((t) => t.id === parentId).subTasks;
    const filteredTasks = subTasks.filter((t) => t.id !== id);

    setTodos(
      todos.map((todo) =>
        todo.id === id ? '' : { ...todo, subTasks: filteredTasks }
      )
    );
  };

  const handleComplete = (id, parentId) => {
    const todo = todos.find((t) => t.id === parentId);
    const newArray = todo.subTasks.map((t) =>
      t.id === id ? { ...t, isDone: !t.isDone } : t
    );
    console.log(parentId);
    setTodos(
      todos.map((todo) =>
        todo.id === parentId ? { ...todo, subTasks: newArray } : todo
      )
    );
  };
  const checkEveryDone = (parentId) => {
    const todo = todos.find((t) => t.id === parentId);
    const subtodos = todo.subTasks.every((t) => t.isDone === true);
    if (subtodos) {
      setTodos(
        todos.map((todo) =>
          todo.id === parentId ? { ...todo, isDone: true } : todo
        )
      );
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="todoHolder">
      <div className={isDone ? 'subtodoMainDone' : 'subtodoMain'}>
        <div
          className={isDone ? 'checkboxDone' : 'checkbox'}
          onClick={() => handleComplete(id, parentId)}
        >
          {isDone ? (
            <GrCheckboxSelected className="done" />
          ) : (
            <GrCheckbox className="done" />
          )}{' '}
        </div>
        <div
          className="title"
          id="title"
          onClick={() => handleComplete(id, parentId)}
        >
          <p>{name}</p>
        </div>
        <div
          className="icons"
          data-test-id="deleteButton"
          onClick={() => handleDelete(id, parentId)}
        >
          <FaTrashAlt className="trash" />
        </div>
      </div>
    </div>
  );
};

export default SubTodo;
