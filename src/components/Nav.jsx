import '../assets/Nav.scss';
import { useContext } from 'react';
import { TodoContext } from '../context/context';

const Nav = () => {
  const { todos, active, setActive } = useContext(TodoContext);
  return (
    <nav className="mainNav">
      <h1>
        {todos.length === 0
          ? 'No todos left'
          : `You have ${todos.length} Todos`}
      </h1>
      <div className="buttons">
        <button
          style={{ backgroundColor: !active ? '#50D2C1' : '' }}
          onClick={() => setActive(false)}
        >
          Done
        </button>
        <button
          style={{ backgroundColor: active ? '#50D2C1' : '' }}
          onClick={() => setActive(true)}
        >
          All
        </button>
      </div>
    </nav>
  );
};

export default Nav;
