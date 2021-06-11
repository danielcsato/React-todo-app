import React, { createContext, useState, useEffect } from 'react';
import { sampleTodos } from '../data';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (!todos?.length) {
      setTodos(sampleTodos);
    } else {
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
    const completedSubs = todo.subTasks.map((t) => ({
      ...t,
      isDone: !todo.isDone,
    }));
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, isDone: !todo.isDone, subTasks: completedSubs }
        : todo
    );

    setTodos(newTodos);
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
