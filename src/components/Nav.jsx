import React from 'react';
import '../assets/Nav.scss';
import { useContext } from 'react';
import { TodoContext } from '../context/context';
import { GrPowerReset } from 'react-icons/gr';

const Nav = () => {
  const { todos, active, setActive, setTodos } = useContext(TodoContext);

  return (
    <nav className="mainNav">
      <p>{todos ? `You have ${todos.length} Todos` : 'No todos left'}</p>
      <div className="buttons">
        <button
          className={active ? 'buttonInactive' : 'buttonActive'}
          onClick={() => setActive(false)}
        >
          Done
        </button>
        <button
          className={active ? 'buttonActive' : 'buttonInactive'}
          onClick={() => setActive(true)}
        >
          All
        </button>
      </div>
      <GrPowerReset className="reset" onClick={() => setTodos([])} />
    </nav>
  );
};

export default Nav;
