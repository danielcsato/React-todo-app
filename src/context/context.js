import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo, description) => {
    setTodos([
      ...todos,
      {
        name: todo,
        description: description,
        id: uuidv4(),
        isCompleted: false,
      },
    ]);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, handleDelete, handleComplete }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
