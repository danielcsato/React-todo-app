import '../assets/Nav.scss';
import { useContext } from 'react';
import { TodoContext } from '../context/context';

const Nav = () => {
  const { todos, active, setActive } = useContext(TodoContext);
  return (
    <nav className="mainNav">
      <p>
        {todos.length === 0
          ? 'No todos left'
          : `You have ${todos.length} Todos`}
      </p>
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
    </nav>
  );
};

export default Nav;
