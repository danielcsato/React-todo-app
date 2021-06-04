import { useContext, useState } from 'react';
import '../assets/TodoForm.scss';

import { TodoContext } from '../context/context';
import { v4 as uuidv4 } from 'uuid';
import { getTime } from '../helpers/util';

const TodoForm = ({ parentForm, parent, subTasks }) => {
  const [todoName, setTodoName] = useState('');
  const { todos, setTodos } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todos.some((todo) => todo.title === todoName)) {
      alert('Name already exists');
    } else {
      setTodos((t) => [
        ...t,
        {
          id: uuidv4(),
          title: todoName,
          isDone: false,
          createTime: getTime(),
          parentId: null,
          subTasks: [],
        },
      ]);
      setTodoName('');
    }
  };

  const handleSubtask = (e) => {
    e.preventDefault();
    const checkName = todos.some((todo) => todo.title === todoName);
    if (checkName) {
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
      setTodos((t) => [...t]);
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
            className={
              todoName.length === 0 ? 'submitBtnDisabled' : 'submitBtn'
            }
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
