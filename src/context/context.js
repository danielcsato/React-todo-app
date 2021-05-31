import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [active, setActive] = useState(true);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addNew,
        setAddNew,
        active,
        setActive,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
