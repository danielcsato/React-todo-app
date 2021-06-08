import React, { useState } from 'react';
import '../assets/Todo.scss';
import PropTypes from 'prop-types';

import { FaTrashAlt } from 'react-icons/fa';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

import TodoForm from './TodoForm';
import SubTodo from './SubTodo';
import Modal from './Modal';

const Todo = ({ name, id, handleComplete, deleteTodo, isDone, subTasks }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          deleteTodo={() => deleteTodo(id, setIsOpen)}
        />
      )}
      <div className={isDone ? 'todoMainDone' : 'todoMain'}>
        <div
          className={isDone ? 'checkboxDone' : 'checkbox'}
          onClick={() => handleComplete(id)}
        >
          {isDone ? (
            <GrCheckboxSelected className="done" />
          ) : (
            <GrCheckbox className="done" />
          )}
        </div>
        <div className="title" id="title" onClick={() => handleComplete(id)}>
          <p>{name}</p>
        </div>
        <div
          className="icons"
          data-test-id="deleteButton"
          onClick={() => setIsOpen(true)}
        >
          <FaTrashAlt className="trash" />
        </div>
      </div>
      {subTasks.length > 0 && (
        <div>
          <ul>
            {subTasks.map((sub) => {
              return (
                <li key={sub.id}>
                  <SubTodo
                    name={sub.title}
                    id={sub.id}
                    isDone={sub.isDone}
                    parentId={sub.parentId}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <TodoForm parent={id} subTasks={subTasks} />
    </div>
  );
};

Todo.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleComplete: PropTypes.func,
  deleteTodo: PropTypes.func,
  subTasks: PropTypes.array,
};

export default Todo;
