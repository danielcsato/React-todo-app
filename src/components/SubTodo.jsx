import { useState } from 'react';
import { useContext } from 'react';
import { TodoContext } from '../context/context';
import PropTypes from 'prop-types';
import {
  deleteSubTodo,
  handleSubTodoComplete,
  handleMove,
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

  return (
    <div className="todoHolder">
      <div className={isDone ? 'subtodoMainDone' : 'subtodoMain'}>
        <div
          className={isDone ? 'checkboxDone' : 'checkbox'}
          onClick={() => handleSubTodoComplete(id, parentId, todos, setTodos)}
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
          onClick={() => handleSubTodoComplete(id, parentId, todos, setTodos)}
        >
          <p>{name}</p>
        </div>
        <div className="icons">
          {!move ? (
            <HiOutlineFolderRemove onClick={() => setMove(true)} />
          ) : (
            <select
              className="select"
              defaultValue=""
              onChange={(e) =>
                handleMove(e, id, parentId, setMove, todos, setTodos)
              }
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
