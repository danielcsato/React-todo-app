import {
  ADD_TODO_NAME_INPUT_SELECTOR,
  ADD_TODO_SUBMIT_BTN_SELECTOR,
  ADD_SUBTODO_SUBMIT_BTN_SELECTOR,
  SHOW_ADD_SUBTODO_INPUT_SELECTOR,
  SELECT_MOVE_SELECTOR,
  PARENT_DONE_SELECTOR,
  RESET_BTN_SELECTOR,
} from './selectors';

describe.skip('Todo app test', () => {
  const URL = 'http://localhost:3000/';
  it('Visits the todo app and clears localstorage', () => {
    cy.visit(URL);
    cy.get(RESET_BTN_SELECTOR).click();
  });

  it('Adds a new todo and completes it', () => {
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).type('Test todo 1');
    cy.get(ADD_TODO_SUBMIT_BTN_SELECTOR).click();
    cy.get(PARENT_DONE_SELECTOR).click();
  });

  it('Adds 3 subtask below the parent task', () => {
    cy.get(SHOW_ADD_SUBTODO_INPUT_SELECTOR).click();
    cy.get(ADD_SUBTODO_SUBMIT_BTN_SELECTOR).type('Test subtodo 1{enter}');
    cy.get(ADD_SUBTODO_SUBMIT_BTN_SELECTOR).type('Test subtodo 2{enter}');
    cy.get(ADD_SUBTODO_SUBMIT_BTN_SELECTOR).type('Test subtodo 3{enter}');
    cy.get(SHOW_ADD_SUBTODO_INPUT).click();
  });

  it('Completes the subtasks', () => {
    cy.get(
      ':nth-child(1) > .todoHolder > .subtodoMain > .checkbox > .done'
    ).click();
    cy.get(
      ':nth-child(2) > .todoHolder > .subtodoMain > .checkbox > .done'
    ).click();

    cy.get(
      ':nth-child(3) > .todoHolder > .subtodoMain > .checkbox > .done'
    ).click();
  });

  it('Adds another parent task', () => {
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).type('Test todo 2');
    cy.get(ADD_TODO_SUBMIT_BTN).click();
  });

  it('Moves a subtask to the newly created parent task ', () => {
    cy.get(
      ':nth-child(1) > .todoHolder > .subtodoMainDone > .icons > .moveIcon'
    ).click();
    cy.get(SELECT_MOVE_SELECTOR).select('Test todo 2');
  });
  it('Checks the length of the original parent after moving subtodo', () => {
    cy.get(
      ':nth-child(1) > :nth-child(1) > .todoMainDone > #title > p'
    ).contains('(2)');
  });

  it('Checks the length of the new parent after moving subtodo', () => {
    cy.get(
      ':nth-child(2) > :nth-child(1) > .todoMainDone > #title > p'
    ).contains('(1)');
  });

  it('Creates a new subtodo to the first parent todo', () => {
    cy.get(
      ':nth-child(1) > :nth-child(1) > .todoMainDone > .icons > .showSubs > svg'
    ).click();
    cy.get('.todoFormSub > form > .todoName').type('Test subtodo 4{enter}');
    cy.get('.todoMain > .icons > .showSubs > svg').click();
  });

  it('Checks if first todo is not completed', () => {
    cy.get('.todoMain > .checkbox > .done').should('have.class', 'done');
  });

  it('Deletes the latest subtodo', () => {
    cy.get('.subtodoMain > .icons > .trash').click();
  });

  it('Checks if first todo is completed', () => {
    cy.get(
      ':nth-child(1) > :nth-child(1) > .todoMainDone > .checkboxDone > .Undo'
    ).should('have.class', 'Undo');
  });
  it('Checks the length of the parent after deleting subtodo', () => {
    cy.get(
      ':nth-child(1) > :nth-child(1) > .todoMainDone > #title > p'
    ).contains('(2)');
  });
});
