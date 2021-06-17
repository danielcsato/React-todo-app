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
  TODOLIST_LI_SELECTOR,
  UNDO_BTN_SELECTOR,
  DONE_BTN_SELECTOR,
} from './selectors';

const URL = 'http://localhost:3000/';
const mockTodoName1 = 'Sample todo 1';
const mockTodoName2 = 'Sample todo 2';

describe('Check rendering', () => {
  it('Should go to the desrired URL and check if localstorage loads up', () => {
    cy.visit(URL);
    cy.get(LIST_SELECTOR).should('exist');
    cy.url().should('eq', URL);
  });
});

describe('Add new todo functionality', () => {
  it('Adds a new todo', () => {
    cy.visit(URL);
    cy.get(RESET_BTN_SELECTOR).click();
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).type(mockTodoName1);
    cy.get(ADD_TODO_SUBMIT_BTN_SELECTOR).click();
    cy.get(PARENT_DONE_SELECTOR).click();
    cy.get(LIST_SELECTOR).should('exist');
    cy.get(UNDO_BTN_SELECTOR).should('exist');
  });
  it('Adds 3 subtask', () => {
    cy.get(SHOW_ADD_SUBTODO_BTN_SELECTOR).click();
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).first().type('Test subtodo 1{enter}');
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).first().type('Test subtodo 2{enter}');
    cy.get(ADD_TODO_NAME_INPUT_SELECTOR).first().type('Test subtodo 3{enter}');
    cy.get(SHOW_ADD_SUBTODO_BTN_SELECTOR).click();
    cy.get(TODO_BODY_SELECTOR).contains(`${mockTodoName1} (3)`);
  });
});

describe('Move functionality', () => {
  it('Moves a subtask', () => {
    cy.visit(URL);
    cy.get(SUBTODO_MOVEICON_SELECTOR).first().click();
    cy.get(SELECT_MOVE_SELECTOR).select('Sample todo 2');
  });

  it('Checks the length of todos', () => {
    cy.get(PARENT_TODO_SELECTOR).first().contains(`${mockTodoName1} (1)`);
    cy.get(TODOLIST_UL_SELECTOR)
      .first()
      .find('li')
      .should(($li) => {
        expect($li).to.have.length(1);
      });

    cy.get(PARENT_TODO_SELECTOR).eq(1).contains(`${mockTodoName2} (2)`);
    cy.get(TODOLIST_UL_SELECTOR)
      .eq(1)
      .find('li')
      .should(($li) => {
        expect($li).to.have.length(2);
      });
  });
});

describe('Delete functionality', () => {
  it('Checks if first todo is not completed', () => {
    cy.visit(URL);
    cy.get(PARENT_TODO_SELECTOR)
      .first()
      .children()
      .should('have.class', 'checkbox');
  });

  it('Deletes the latest subtodo and check if parent is done', () => {
    cy.get('.subtodoMain > .icons > .trash').click();
    cy.get(TODOLIST_CONTAINER_SELECTOR).contains(`${mockTodoName1} (1)`);

    cy.get(PARENT_TODO_SELECTOR)
      .first()
      .children()
      .should('have.class', 'checkboxDone');
  });
});

describe('Complete functionality', () => {
  it('Completes a subtask', () => {
    cy.visit(URL);
    cy.get(TODOLIST_LI_SELECTOR).eq(0).click();
  });
  it('Check if parent is completed after', () => {
    cy.get(DONE_BTN_SELECTOR).should('not.exist');
  });
});

describe('Uncomplete functionality', () => {
  it('Uncompletes a subtask', () => {
    cy.visit(URL);
    cy.get(TODOLIST_LI_SELECTOR).eq(0).click();
  });
  it('Check if parent is uncompleted after', () => {
    cy.get(UNDO_BTN_SELECTOR).should('exist');
  });
});
