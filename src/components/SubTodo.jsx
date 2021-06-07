import { useContext } from 'react';
import { TodoContext } from '../context/context';
import PropTypes from 'prop-types';

import { FaTrashAlt } from 'react-icons/fa';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

const SubTodo = ({ name, id, isDone, parentId }) => {
  const { todos, setTodos } = useContext(TodoContext);

  const handleDelete = (id, parentId) => {
    const subTasks = todos.find((t) => t.id === parentId).subTasks;
    const filteredTasks = subTasks.filter((t) => t.id !== id);

    const hasAllSubTodosCompleted = filteredTasks.every(
      (todo) => todo.isDone === true
    );

    const newArray = todos.map((todo) =>
      todo.id === id
        ? ''
        : { ...todo, isDone: hasAllSubTodosCompleted, subTasks: filteredTasks }
    );

    setTodos(newArray);
  };

  // TODO FIX THIS
  const handleComplete = (id, parentId) => {
    const todo = todos.find((todo) => todo.id === parentId);
    const newSubTaskArray = todo.subTasks.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            isDone: !todo.isDone,
          }
        : todo
    );

    const hasAllSubTodosCompleted = newSubTaskArray.every(
      (todo) => todo.isDone === true
    );

    const newArray = todos.map((todo) =>
      todo.id === parentId
        ? {
            ...todo,
            isDone: hasAllSubTodosCompleted,
            subTasks: newSubTaskArray,
          }
        : todo
    );
    setTodos(newArray);
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

SubTodo.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  parentId: PropTypes.string,
};

export default SubTodo;
