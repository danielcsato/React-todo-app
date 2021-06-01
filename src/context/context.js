import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  //stores every todo
  const [todos, setTodos] = useState([]);
  //filter state, true means show every todo
  const [active, setActive] = useState(true);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        active,
        setActive,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
