import { useState } from 'react';
import '../assets/Todo.scss';

import { FaTrashAlt } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import { deleteTodo } from '../helpers/api';

const Modal = ({ setIsOpen, deleteTodo }) => {
  return (
    <>
      <div className="overlay" onClick={() => setIsOpen(false)} />
      <div className="modal">
        <div className="modalTitle">
          <h5>Are you sure?</h5>
        </div>
        <div className="modalButtons">
          <button className="modalKeep" onClick={() => setIsOpen(false)}>
            Keep
          </button>
          <button className="modalDelete" onClick={deleteTodo}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

const Todo = ({ name, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          deleteTodo={() => deleteTodo(id, setIsOpen)}
        />
      )}
      <div className="todoMain">
        <div className="checkbox">
          <MdDone className="done" />
        </div>
        <div className="title" id="title">
          <p>{name}</p>
        </div>
        <div className="icons" onClick={() => setIsOpen(true)}>
          <FaTrashAlt className="trash" />
        </div>
      </div>
    </div>
  );
};

export default Todo;
