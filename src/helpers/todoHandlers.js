//  DELETE SUBTASK

export const deleteSubTodo = (id, parentId, todos) => {
  const { subTasks } = todos.find((todo) => todo.id === parentId);
  const filteredTasks = subTasks.filter((todo) => todo.id !== id);
  const hasAllSubTodosCompleted = filteredTasks.every((todo) => todo.isDone);

  const newArray = todos.map((todo) =>
    todo.id === parentId
      ? { ...todo, isDone: hasAllSubTodosCompleted, subTasks: filteredTasks }
      : todo
  );

  return newArray;
};

//  COMPLETE SUBTASK

export const completeSubTodo = (id, parentId, todos) => {
  const todo = todos.find((todo) => todo.id === parentId);
  const newSubTaskArray = todo.subTasks.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          isDone: !todo.isDone,
        }
      : todo
  );

  const hasAllSubTodosCompleted = newSubTaskArray.every((todo) => todo.isDone);

  const newArray = todos.map((todo) =>
    todo.id === parentId
      ? {
          ...todo,
          isDone: hasAllSubTodosCompleted,
          subTasks: newSubTaskArray,
        }
      : todo
  );
  return newArray;
};

// CHECK IF NAME IS ALREADY EXISTS

export const isTodoNameAlreadyExists = (todos, name) =>
  todos.some((todo) => todo.title === name);

export const isSubTodoNameAlreadyExists = (todos, name) => {
  let bool;
  todos.forEach((todo) =>
    todo.subTasks.some((subTask) =>
      subTask.title === name ? (bool = true) : ''
    )
  );

  return bool;
};

// HANDLES CHANGE OF PARENTS

export const moveSubTask = (value, id, parentId, todos) => {
  const targetValue = value;
  // finds the subtasks of the parent task
  const movedSubtasksParent = todos.find(
    (todo) => todo.id === parentId
  ).subTasks;

  //finds the moved subtask
  const getSubtask = movedSubtasksParent
    .filter((todo) => todo.id === id)
    .map((todo) =>
      todo.id === id
        ? {
            ...todo,
            parentId: targetValue,
          }
        : todo
    );
  //filters out the moved subtask
  const filteredSubtasks = movedSubtasksParent.filter((todo) => todo.id !== id);

  //finds the new parent task
  const newParentTask = todos.find((todo) => todo.id === targetValue).subTasks;
  //Adds the moved subtask to subtasks of the new parent
  const newParentSubtasks = newParentTask.concat(getSubtask);

  const hasAllSubTodosCompleted = movedSubtasksParent
    .filter((todo) => todo.id !== id)
    .every((todo) => todo.isDone);
  const newParentHasAllSubTodosCompleted = newParentSubtasks.every(
    (todo) => todo.isDone
  );

  //Creates a temporary array , this changes the subtasks of the new parent task

  //Final array of todos, this removes the moved subtask from previous parent task
  const tempArray = todos.map((todo) =>
    todo.id === parentId
      ? {
          ...todo,
          isDone: hasAllSubTodosCompleted,
          subTasks: filteredSubtasks,
        }
      : todo
  );
  const newArray = tempArray.map((todo) =>
    todo.id === targetValue
      ? {
          ...todo,
          isDone: newParentHasAllSubTodosCompleted,
          subTasks: newParentSubtasks,
        }
      : todo
  );

  return newArray;
};

//
export const getTodosWithoutSubTodoParent = (todos, todoId) =>
  todos.filter(({ id }) => id !== todoId);
