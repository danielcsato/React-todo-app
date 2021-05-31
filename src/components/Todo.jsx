import '../assets/Todo.scss';

import { FaTrashAlt } from 'react-icons/fa';
import { deleteTodo } from '../helpers/api';

const Todo = ({ name, id }) => {
  return (
    <div className='todo'>
      <div className='checkbox'>
        <input type='checkbox'></input>
      </div>
      <div className='title'>
        <h4>{name}</h4>
      </div>
      <div className='icons'>
        <FaTrashAlt className='icon' onClick={() => deleteTodo(id)} />
      </div>
    </div>
  );
};

export default Todo;
