//  DELETE SUBTASK

export const handleSubTodoDelete = (id, parentId, todos, setTodos) => {
  const { subTasks } = todos.find((todo) => todo.id === parentId);
  const filteredTasks = subTasks.filter((todo) => todo.id !== id);
  console.log(filteredTasks);
  const hasAllSubTodosCompleted = filteredTasks.every((todo) => todo.isDone);

  const newArray = todos.map((todo) =>
    todo.id === parentId
      ? { ...todo, isDone: hasAllSubTodosCompleted, subTasks: filteredTasks }
      : todo
  );

  setTodos(newArray);
};

//  COMPLETE SUBTASK

export const handleSubTodoComplete = (id, parentId, todos, setTodos) => {
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
  setTodos(newArray);
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

export const handleMove = (e, id, parentId, setMove, todos, setTodos) => {
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
            parentId: e.target.value,
          }
        : todo
    );
  //filters out the moved subtask
  const filteredSubtasks = movedSubtasksParent.filter((todo) => todo.id !== id);

  //finds the new parent task
  const newParentTask = todos.find(
    (todo) => todo.id === e.target.value
  ).subTasks;
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
    todo.id === e.target.value
      ? {
          ...todo,
          isDone: newParentHasAllSubTodosCompleted,
          subTasks: newParentSubtasks,
        }
      : todo
  );

  setTodos(newArray);
  setMove(false);
};

//
export const getOptions = (todos, parentId) =>
  todos.filter((todo) => todo.id !== parentId);
