import React, { createContext, useState, useEffect } from 'react';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (id, state) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    state(false);
  };

  const handleComplete = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (todo.isDone === false) {
      const completedSubs = todo.subTasks.map((t) =>
        t.length !== 0 ? { ...t, isDone: true } : t
      );
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? { ...todo, isDone: !todo.isDone, subTasks: completedSubs }
            : todo
        )
      );
    } else {
      const completedSubs = todo.subTasks.map((t) =>
        t.length !== 0 ? { ...t, isDone: false } : t
      );
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? { ...todo, isDone: !todo.isDone, subTasks: completedSubs }
            : todo
        )
      );
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        active,
        setActive,
        deleteTodo,
        handleComplete,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
