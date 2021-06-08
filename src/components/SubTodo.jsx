import { useContext } from 'react';
import { TodoContext } from '../context/context';
import PropTypes from 'prop-types';
import {
  handleSubTodoDelete,
  handleSubTodoComplete,
} from '../helpers/todoHandlers';
import { FaTrashAlt } from 'react-icons/fa';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

const SubTodo = ({ name, id, isDone, parentId }) => {
  const { todos, setTodos } = useContext(TodoContext);

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
        <div
          className="icons"
          data-test-id="deleteButton"
          onClick={() => handleSubTodoDelete(id, parentId, todos, setTodos)}
        >
          <FaTrashAlt className="trash" />
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
