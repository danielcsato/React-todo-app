import '../assets/Todo.scss';

import { FaTrashAlt } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import { deleteTodo } from '../helpers/api';

const Todo = ({ name, id }) => {
  return (
    <div className="todoMain">
      <div className="checkbox">
        <MdDone className="icon" />
      </div>
      <div className="title">
        <h5>{name}</h5>
      </div>
      <div className="icons" onClick={() => deleteTodo(id)}>
        <FaTrashAlt className="icon" />
      </div>
    </div>
  );
};

export default Todo;
