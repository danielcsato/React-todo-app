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

  // TODO FIX THIS
  const handleComplete = (id, parentId) => {
    const todo = todos.find((todo) => todo.id === parentId);
    const subTodos = todo.subTasks.every((todo) => todo.isDone === true);
    //sets the subtodos isDone and sets parent todos isDone to false if the subtodos arent completed
    if (!subTodos) {
      const newSubs = todo.subTasks.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );
      const newArray = todos.map((todo) =>
        todo.id === parentId
          ? { ...todo, isDone: true, subTasks: newSubs }
          : todo
      );
      setTodos(newArray);
    }

    //sets the subtodos isDone and sets parent todo to completed if every other subtodo is done aswell
    else if (subTodos) {
      const newSubs = todo.subTasks.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );
      const newArray = todos.map((todo) =>
        todo.id === parentId
          ? { ...todo, isDone: false, subTasks: newSubs }
          : todo
      );
      setTodos(newArray);
    }
  };

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
