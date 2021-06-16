import {
  ADD_TODO_NAME_INPUT_SELECTOR,
  ADD_TODO_SUBMIT_BTN_SELECTOR,
  SHOW_ADD_SUBTODO_BTN_SELECTOR,
  SELECT_MOVE_SELECTOR,
  PARENT_DONE_SELECTOR,
  RESET_BTN_SELECTOR,
  LIST_SELECTOR,
  PARENT_TODO_SELECTOR,
  TODOLIST_CONTAINER_SELECTOR,
  TODOLIST_UL_SELECTOR,
  TODO_BODY_SELECTOR,
  SUBTODO_MOVEICON_SELECTOR,
  ADD_NEW_SUBTODO_ICON_SELECTOR,
  ADD_NEW_SUBTODO_ICON_MINUS_SELECTOR,
  TODOLIST_LI_SELECTOR,
  UNDO_BTN_SELECTOR,
  DONE_BTN_SELECTOR,
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
    cy.get(UNDO_BTN_SELECTOR).should('exist');
  });

  it('Adds 3 subtask below the parent task', () => {
    cy.get(SHOW_ADD_SUBTODO_BTN_SELECTOR).click();
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).first().type('Test subtodo 1{enter}');
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).first().type('Test subtodo 2{enter}');
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).first().type('Test subtodo 3{enter}');
    cy.get(SHOW_ADD_SUBTODO_BTN_SELECTOR).click();
    cy.get(TODO_BODY_SELECTOR).contains(`${mockTodoName1} (3)`);
  });

  it('Completes the subtasks', () => {
    cy.get(TODOLIST_LI_SELECTOR).eq(0).click();
    cy.get(TODOLIST_LI_SELECTOR).eq(1).click();
    cy.get(TODOLIST_LI_SELECTOR).eq(2).click();
    cy.get(DONE_BTN_SELECTOR).should('not.exist');
  });

  it('Adds another parent task', () => {
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).type(mockTodoName2);
    cy.get(ADD_TODO_SUBMIT_BTN_SELECTOR).click();
    cy.get(TODOLIST_CONTAINER_SELECTOR).contains(mockTodoName2);
  });

  it('Moves a subtask to the newly created parent task ', () => {
    cy.get(SUBTODO_MOVEICON_SELECTOR).first().click();
    cy.get(SELECT_MOVE_SELECTOR).select(mockTodoName2);
  });

  it('Checks the length of the original parent after moving subtodo', () => {
    cy.get(PARENT_TODO_SELECTOR).first().contains(`${mockTodoName1} (2)`);
    cy.get(TODOLIST_UL_SELECTOR)
      .first()
      .find('li')
      .should(($li) => {
        expect($li).to.have.length(2);
      });
  });

  it('Checks the length of the new parent after moving subtodo', () => {
    cy.get(PARENT_TODO_SELECTOR).eq(1).contains(`${mockTodoName2} (1)`);
    cy.get(TODOLIST_UL_SELECTOR)
      .eq(1)
      .find('li')
      .should(($li) => {
        expect($li).to.have.length(1);
      });
  });

  it('Creates a new subtodo to the first parent todo', () => {
    cy.get(ADD_NEW_SUBTODO_ICON_SELECTOR).first().click();
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).first().type('Test subtodo 4{enter}');
    cy.get(ADD_NEW_SUBTODO_ICON_MINUS_SELECTOR).first().click();
    cy.get(TODOLIST_CONTAINER_SELECTOR).contains(`${mockTodoName1} (3)`);
  });

  it('Checks if first todo is not completed', () => {
    cy.get(PARENT_TODO_SELECTOR)
      .first()
      .children()
      .should('have.class', 'checkbox');
  });

  it('Deletes the latest subtodo', () => {
    cy.get('.subtodoMain > .icons > .trash').click();
    cy.get(TODOLIST_CONTAINER_SELECTOR).contains(`${mockTodoName1} (2)`);
  });

  it('Checks if first todo is completed', () => {
    cy.get(PARENT_TODO_SELECTOR)
      .first()
      .children()
      .should('have.class', 'checkboxDone');
  });

  it('Checks the length of the parent after deleting subtodo', () => {
    cy.get(TODOLIST_CONTAINER_SELECTOR).contains(`${mockTodoName1} (2)`);
  });
});
