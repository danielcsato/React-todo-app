//  DELETE SUBTASK

export const handleSubTodoDelete = (id, parentId, array, setArray) => {
  const subTasks = array.find((todo) => todo.id === parentId).subTasks;
  const filteredTasks = subTasks.filter((todo) => todo.id !== id);

  const hasAllSubTodosCompleted = filteredTasks.every(
    (todo) => todo.isDone === true
  );

  const newArray = array.map((todo) =>
    todo.id === id
      ? ''
      : { ...todo, isDone: hasAllSubTodosCompleted, subTasks: filteredTasks }
  );

  setArray(newArray);
};

//  COMPLETE SUBTASK

export const handleSubTodoComplete = (id, parentId, array, setArray) => {
  const todo = array.find((todo) => todo.id === parentId);
  const newSubTaskArray = todo.subTasks.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          isDone: !todo.isDone,
        }
      : todo
  );

  const hasAllSubTodosCompleted = newSubTaskArray.every(
    (todo) => todo.isDone === true
  );

  const newArray = array.map((todo) =>
    todo.id === parentId
      ? {
          ...todo,
          isDone: hasAllSubTodosCompleted,
          subTasks: newSubTaskArray,
        }
      : todo
  );
  setArray(newArray);
};

// CHECK IF NAME IS ALREADY EXISTS

export const isTodoNameAlreadyExists = (array, name) =>
  array.some((todo) => todo.title === name);

export const isSubTodoNameAlreadyExists = (array, name) => {
  var bool;
  array.forEach((todo) =>
    todo.subTasks.some((subTask) =>
      subTask.title === name ? (bool = true) : ''
    )
  );

  return bool;
};
