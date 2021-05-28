import React from 'react';
import '../assets/Todo.scss';
import { MdDone } from 'react-icons/md';
import { BiUndo } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';

const Todo = ({
  name,
  id,
  description,
  handleComplete,
  handleDelete,
  isCompleted,
}) => {
  return (
    <div className='todo'>
      <div className='todoTop'>
        <h3>{name}</h3>
        <div className='icons'>
          {!isCompleted ? (
            <MdDone className='icon' onClick={() => handleComplete(id)} />
          ) : (
            <BiUndo className='icon' onClick={() => handleComplete(id)} />
          )}
          <FaTrashAlt className='icon' onClick={() => handleDelete(id)} />
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default Todo;
