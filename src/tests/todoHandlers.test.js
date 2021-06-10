import {
  isTodoNameAlreadyExists,
  isSubTodoNameAlreadyExists,
  deleteSubTodo,
  completeSubTodo,
  moveSubTask,
  getTodosWithoutSubTodoParent,
} from '../helpers/todoHandlers';
import { sampleTodos } from '../data';

describe('Todo handler', () => {
  const mockSubTodo = { id: '3' };
  const mockTodo = { id: '1' };

  describe('deleteSubTodo() function', () => {
    it('should delete subtodo from todolist', () => {
      const mockResultSubTodoId = '4';

      const result = deleteSubTodo(mockSubTodo.id, mockTodo.id, sampleTodos);
      const { subTasks } = result.find(({ id }) => id === mockTodo.id);

      expect(subTasks.length).toBe(1);
      expect(subTasks[0].id).toBe(mockResultSubTodoId);
      expect(subTasks.find(({ id }) => id === mockSubTodo.id)).toBeFalsy();
    });
  });

  describe('completeSubTodo() function', () => {
    it('should complete the subtodo', () => {
      const result = completeSubTodo(mockSubTodo.id, mockTodo.id, sampleTodos);
      const { subTasks } = result.find(({ id }) => id === mockTodo.id);

      expect(subTasks.length).toBe(2);
      expect(subTasks[0].isDone).toBeTruthy();
      expect(subTasks[1].isDone).toBeTruthy();
    });
  });
  describe('moveSubTask() function', () => {
    it('should move subtodo to another parent', () => {
      const mockTargetValue = '2';
      const result = moveSubTask(
        mockTargetValue,
        mockSubTodo.id,
        mockTodo.id,
        sampleTodos
      );
      const { subTasks } = result.find(({ id }) => id === mockTodo.id);
      const newParentSubTasks = result[1].subTasks;
      const getOtherSubTaskFromOldTodo = subTasks.find(({ id }) => id === '4');

      const getOtherSubTaskFromOriginalTodoArray = sampleTodos[0].subTasks.find(
        ({ id }) => id === '4'
      );

      expect(subTasks.length).toBe(1);
      expect(subTasks.find((todo) => todo.id === '3')).toBeFalsy();
      expect(newParentSubTasks.length).toBe(2);
      expect(newParentSubTasks.find((todo) => todo.id === '3')).toBeTruthy();
      expect(
        getOtherSubTaskFromOldTodo === getOtherSubTaskFromOriginalTodoArray
      ).toBeTruthy();
    });
  });

  describe('getTodosWithoutSubTodoParent() function', () => {
    it('should return todos without subtodo parent', () => {
      const mockParentId = '1';
      const mockResultTodoId = '2';
      const result = getTodosWithoutSubTodoParent(sampleTodos, mockParentId);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(mockResultTodoId);
      expect(result.find((todo) => todo.id === mockParentId)).toBeFalsy();
    });
  });

  describe('isTodoNameAlreadyExists() function', () => {
    it('should return true, if todo name already exists', () => {
      expect(
        isTodoNameAlreadyExists(sampleTodos, 'Sample todo 1')
      ).toBeTruthy();
    });
    it("should return false, if todo name doesn't exists", () => {
      expect(isTodoNameAlreadyExists(sampleTodos, 'new todo')).toBeFalsy();
    });
  });

  describe('isSubTodoNameAlreadyExists() function', () => {
    it('should return true, if subtodo name already exists', () => {
      expect(
        isSubTodoNameAlreadyExists(sampleTodos, 'Sample subtodo 1')
      ).toBeTruthy();
    });
    it("should return false, if subtodo name doesn't exists", () => {
      expect(
        isSubTodoNameAlreadyExists(sampleTodos, 'new subtodo')
      ).toBeFalsy();
    });
  });
});
