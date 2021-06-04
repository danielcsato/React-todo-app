import { useContext, useState } from 'react';
import '../assets/TodoForm.scss';

import { TodoContext } from '../context/context';
import { v4 as uuidv4 } from 'uuid';
import { getTime } from '../helpers/util';

const TodoForm = ({ parentForm, parent, subTasks }) => {
  const [todoName, setTodoName] = useState('');
  const { todos, setTodos } = useContext(TodoContext);

  const checkName = () => {
    if (todos.some((todo) => todo.title === todoName)) {
      return true;
    }
    // TODO check subtodos title aswell
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkName()) {
      alert('Name already exists');
    } else {
      const newTodos = [
        ...todos,
        {
          id: uuidv4(),
          title: todoName,
          isDone: false,
          createTime: getTime(),
          subTasks: [],
        },
      ];
      setTodos(newTodos);
      setTodoName('');
    }
  };

  const handleSubtask = (e) => {
    e.preventDefault();
    if (checkName()) {
      alert('Name already exists');
    } else {
      subTasks.push({
        id: uuidv4(),
        title: todoName,
        isDone: false,
        createTime: getTime(),
        parentId: parent,
      });
      setTodoName('');
      setTodos([...todos]);
    }
  };
  return (
    <div className={parentForm ? 'todoForm' : 'todoFormSub'}>
      <form onSubmit={parentForm ? handleSubmit : handleSubtask}>
        <input
          className="todoName"
          required
          type="text"
          placeholder={parentForm ? 'Add todo' : 'Add subtask'}
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        {parentForm && (
          <button
            className="submitBtn"
            type="submit"
            disabled={todoName.length === 0}
          >
            Add Todo
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoForm;
