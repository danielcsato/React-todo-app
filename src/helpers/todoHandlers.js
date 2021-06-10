//  DELETE SUBTASK

const hasAllSubTodosCompleted = (subTasks) =>
  subTasks.every((todo) => todo.isDone);

export const deleteSubTodo = (subTodoId, todoId, todos) => {
  const { subTasks } = todos.find(({ id }) => id === todoId);
  const filteredSubTasks = subTasks.filter(({ id }) => id !== subTodoId);
  const newTodos = todos.map((todo) =>
    todo.id === todoId
      ? {
          ...todo,
          isDone: hasAllSubTodosCompleted(filteredSubTasks),
          subTasks: filteredSubTasks,
        }
      : todo
  );

  return newTodos;
};

//  COMPLETE SUBTASK

export const completeSubTodo = (subTodoId, todoId, todos) => {
  const todo = todos.find(({ id }) => id === todoId);
  const newSubTaskArray = todo.subTasks.map((todo) =>
    todo.id === subTodoId
      ? {
          ...todo,
          isDone: !todo.isDone,
        }
      : todo
  );

  const newTodos = todos.map((todo) =>
    todo.id === todoId
      ? {
          ...todo,
          isDone: hasAllSubTodosCompleted(newSubTaskArray),
          subTasks: newSubTaskArray,
        }
      : todo
  );
  return newTodos;
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

export const moveSubTask = (value, subTodoId, todoId, todos) => {
  const targetValue = value;
  // finds the subtasks of the parent task
  const movedSubtasksParent = todos.find(({ id }) => id === todoId).subTasks;

  //finds the moved subtask
  const getSubtask = movedSubtasksParent.filter(({ id }) => id === subTodoId);
  getSubtask[0].parentId = targetValue;
  //filters out the moved subtask
  const filteredSubtasks = movedSubtasksParent.filter(
    ({ id }) => id !== subTodoId
  );

  //finds the new parent task
  const { subTasks: newParentTask } = todos.find(
    ({ id }) => id === targetValue
  );
  //Adds the moved subtask to subtasks of the new parent
  const newParentSubtasks = newParentTask.concat(getSubtask);

  const hasAllFilteredSubTodosCompleted = movedSubtasksParent
    .filter(({ id }) => id !== subTodoId)
    .every((todo) => todo.isDone);

  //Creates a temporary array , this changes the subtasks of the new parent task
  const tempArray = todos.map((todo) =>
    todo.id === todoId
      ? {
          ...todo,
          isDone: hasAllFilteredSubTodosCompleted,
          subTasks: filteredSubtasks,
        }
      : todo
  );

  //Final array of todos, this removes the moved subtask from previous parent task
  const newTodos = tempArray.map((todo) =>
    todo.id === targetValue
      ? {
          ...todo,
          isDone: hasAllSubTodosCompleted(newParentSubtasks),
          subTasks: newParentSubtasks,
        }
      : todo
  );

  return newTodos;
};

//
export const getTodosWithoutSubTodoParent = (todos, todoId) =>
  todos.filter(({ id }) => id !== todoId);
