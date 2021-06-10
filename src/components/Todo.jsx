import React, { useState } from 'react';
import '../assets/Todo.scss';
import PropTypes from 'prop-types';

import { FaTrashAlt } from 'react-icons/fa';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { BiShow, BiHide } from 'react-icons/bi';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

import TodoForm from './TodoForm';
import SubTodo from './SubTodo';
import Modal from './Modal';

const Todo = ({ name, id, handleComplete, deleteTodo, isDone, subTasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(true);
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
          <p>
            {name} {subTasks.length && `(${subTasks.length})`}
          </p>
        </div>
        <div className="icons">
          {addNew ? (
            <FiMinus onClick={() => setAddNew(!addNew)} />
          ) : (
            <FiPlus onClick={() => setAddNew(!addNew)} />
          )}
          {showSubtasks ? (
            <BiHide onClick={() => setShowSubtasks(!showSubtasks)} />
          ) : (
            <BiShow onClick={() => setShowSubtasks(!showSubtasks)} />
          )}

          <FaTrashAlt className="trash" onClick={() => setIsOpen(true)} />
        </div>
      </div>
      {addNew && <TodoForm parent={id} subTasks={subTasks} />}
      {showSubtasks && (
        <div>
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
        </div>
      )}
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
