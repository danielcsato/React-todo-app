import React from 'react';

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

export default Modal;
