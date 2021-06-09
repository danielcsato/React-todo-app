import React from 'react';
import {
  isTodoNameAlreadyExists,
  isSubTodoNameAlreadyExists,
  handleSubTodoDelete,
} from '../helpers/todoHandlers';
import { sampleTodos } from '../data';

describe('Todo handlers', () => {
  it('should return true, if todo name already exists', () => {
    expect(isTodoNameAlreadyExists(sampleTodos, 'Sample todo 1')).toBeTruthy();
  });
  it("should return false, if todo name doesn't exists", () => {
    expect(isTodoNameAlreadyExists(sampleTodos, 'new todo')).toBeFalsy();
  });
  it('should return true, if subtodo name already exists', () => {
    expect(
      isSubTodoNameAlreadyExists(sampleTodos, 'Sample subtodo 1')
    ).toBeTruthy();
  });
  it("should return false, if subtodo name doesn't exists", () => {
    expect(isSubTodoNameAlreadyExists(sampleTodos, 'new subtodo')).toBeFalsy();
  });
});
