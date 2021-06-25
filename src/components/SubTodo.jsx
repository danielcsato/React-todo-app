import React, { useState } from 'react';
import { useContext } from 'react';
import { TodoContext } from '../context/context';
import PropTypes from 'prop-types';
import {
  deleteSubTodo,
  completeSubTodo,
  moveSubTask,
  getTodosWithoutSubTodoParent,
} from '../helpers/todoHandlers';
import { FaTrashAlt } from 'react-icons/fa';
import { HiOutlineFolderRemove } from 'react-icons/hi';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

const SubTodo = ({ name, id, isDone, parentId }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const [move, setMove] = useState(false);

  const handleSubTodoDelete = (id, parentId) => {
    const newTodos = deleteSubTodo(id, parentId, todos);
    setTodos(newTodos);
  };

  const handleSubTodoComplete = (id, parentId) => {
    const newTodos = completeSubTodo(id, parentId, todos);
    setTodos(newTodos);
  };

  const handleMove = (e, id, parentId) => {
    const { value } = e.target;
    const newTodos = moveSubTask(value, id, parentId, todos);
    setTodos(newTodos);
    setMove(false);
  };

  return (
    <div className="todoHolder">
      <div
        className={isDone ? 'subtodoMainDone' : 'subtodoMain'}
        data-test-id="subTodoContainer"
      >
        <div
          className={isDone ? 'checkboxDone' : 'checkbox'}
          onClick={() => handleSubTodoComplete(id, parentId)}
        >
          {isDone ? (
            <GrCheckboxSelected className="done" />
          ) : (
            <GrCheckbox className="done" />
          )}
        </div>
        <div
          className="title"
          id="title"
          onClick={() => handleSubTodoComplete(id, parentId)}
        >
          <p>{name}</p>
        </div>
        <div className="icons">
          {!move ? (
            <HiOutlineFolderRemove
              onClick={() => setMove(true)}
              className="moveIcon"
              data-test-id="moveTodoIcon"
            />
          ) : (
            <select
              className="select"
              defaultValue=""
              onChange={(e) => handleMove(e, id, parentId)}
            >
              <option value="" disabled>
                Move To
              </option>
              {getTodosWithoutSubTodoParent(todos, parentId).map((todo) => {
                return (
                  <option key={todo.id} value={todo.id}>
                    {todo.title}
                  </option>
                );
              })}
            </select>
          )}

          <FaTrashAlt
            className="trash"
            data-test-id="subtodoTrashIcon"
            onClick={() => handleSubTodoDelete(id, parentId, todos, setTodos)}
          />
        </div>
      </div>
    </div>
  );
};

SubTodo.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDone: PropTypes.bool,
  parentId: PropTypes.string,
};

export default SubTodo;
