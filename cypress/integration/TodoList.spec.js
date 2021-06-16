import {
  ADD_TODO_NAME_INPUT_SELECTOR,
  ADD_TODO_SUBMIT_BTN_SELECTOR,
  ADD_SUBTODO_SUBMIT_INPUT_SELECTOR,
  SHOW_ADD_SUBTODO_BTN_SELECTOR,
  SELECT_MOVE_SELECTOR,
  PARENT_DONE_SELECTOR,
  RESET_BTN_SELECTOR,
  LIST_SELECTOR,
} from './selectors';

describe('Todo app test', () => {
  const URL = 'http://localhost:3000/';
  const mockTodoName1 = 'Test todo 1';
  const mockTodoName2 = 'Test todo 2';
  it('Visits the todo app and clears default tasks', () => {
    cy.visit(URL);
    cy.get(LIST_SELECTOR).should('exist');
    cy.get(RESET_BTN_SELECTOR).click();
    cy.url().should('eq', URL);
    cy.get(LIST_SELECTOR).should('not.exist');
  });
  it('Adds a new todo and completes it', () => {
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).type(mockTodoName1);
    cy.get(ADD_TODO_SUBMIT_BTN_SELECTOR).click();
    cy.get(PARENT_DONE_SELECTOR).click();
    cy.get(LIST_SELECTOR).should('exist');
    cy.get('.Undo').should('exist');
  });

  it('Adds 3 subtask below the parent task', () => {
    cy.get(SHOW_ADD_SUBTODO_BTN_SELECTOR).click();
    cy.get(ADD_SUBTODO_SUBMIT_INPUT_SELECTOR).type('Test subtodo 1{enter}');
    cy.get(ADD_SUBTODO_SUBMIT_INPUT_SELECTOR).type('Test subtodo 2{enter}');
    cy.get(ADD_SUBTODO_SUBMIT_INPUT_SELECTOR).type('Test subtodo 3{enter}');
    cy.get(SHOW_ADD_SUBTODO_BTN_SELECTOR).click();
    cy.get('.todoMain').contains(`${mockTodoName1} (3)`);
  });

  it('Completes the subtasks', () => {
    cy.get(':nth-child(1) > .todoHolder').click();
    cy.get(':nth-child(2) > .todoHolder').click();

    cy.get(':nth-child(3) > .todoHolder').click();
    cy.get('.Done').should('not.exist');
  });

  it('Adds another parent task', () => {
    const mockText = 'Test todo 2';
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).type(mockText);
    cy.get(ADD_TODO_SUBMIT_BTN_SELECTOR).click();
    cy.get('.todoList').contains(mockText);
  });

  it('Moves a subtask to the newly created parent task ', () => {
    cy.get(
      ':nth-child(1) > .todoHolder > .subtodoMainDone > .icons > .moveIcon'
    ).click();
    cy.get(SELECT_MOVE_SELECTOR).select(mockTodoName2);
    cy.get('.todoList').contains(`${mockTodoName2} (1)`);
  });
  it('Checks the length of the original parent after moving subtodo', () => {
    cy.get(
      ':nth-child(1) > :nth-child(1) > .todoMainDone > #title > p'
    ).contains(`${mockTodoName1} (2)`);
  });

  it('Checks the length of the new parent after moving subtodo', () => {
    cy.get(
      ':nth-child(2) > :nth-child(1) > .todoMainDone > #title > p'
    ).contains(`${mockTodoName2} (1)`);
  });

  it('Creates a new subtodo to the first parent todo', () => {
    cy.get(
      ':nth-child(1) > :nth-child(1) > .todoMainDone > .icons > .showSubs > svg'
    ).click();
    cy.get('.todoFormSub > form > .todoName').type('Test subtodo 4{enter}');
    cy.get('.todoMain > .icons > .showSubs > svg').click();
    cy.get('.todoList').contains(`${mockTodoName1} (3)`);
  });

  it('Checks if first todo is not completed', () => {
    cy.get('.todoMain > .checkbox > .done').should('have.class', 'done');
  });

  it('Deletes the latest subtodo', () => {
    cy.get('.subtodoMain > .icons > .trash').click();
    cy.get('.todoList').contains(`${mockTodoName1} (2)`);
  });

  it('Checks if first todo is completed', () => {
    cy.get(
      ':nth-child(1) > :nth-child(1) > .todoMainDone > .checkboxDone > .Undo'
    ).should('have.class', 'Undo');
  });
  it('Checks the length of the parent after deleting subtodo', () => {
    cy.get(
      ':nth-child(1) > :nth-child(1) > .todoMainDone > #title > p'
    ).contains(`${mockTodoName1} (2)`);
  });
});
