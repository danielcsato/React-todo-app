import '../assets/Todo.scss';

import { FaTrashAlt } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import { deleteTodo } from '../helpers/api';

const Todo = ({ name, id }) => {
  return (
    <div className="todoMain">
      <div className="checkbox">
        <MdDone className="done" />
      </div>
      <div className="title" id="title">
        <h5>{name}</h5>
      </div>
      <div className="icons" onClick={() => deleteTodo(id)}>
        <FaTrashAlt className="trash" />
      </div>
    </div>
  );
};

export default Todo;
