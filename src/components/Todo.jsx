import '../assets/Todo.scss';

import { FaTrashAlt } from 'react-icons/fa';
import { deleteTodo } from '../helpers/api';

const Todo = ({ name, id }) => {
  return (
    <div className="todoMain">
      <div className="checkbox">
        <input type="checkbox" />
      </div>
      <div className="title">
        <h4>{name}</h4>
      </div>
      <div className="icons" onClick={() => deleteTodo(id)}>
        <FaTrashAlt className="icon" />
      </div>
    </div>
  );
};

export default Todo;
