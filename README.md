### `npm i`
### `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `task 1`
There should be a list of todos in the screen. 


A todo item should contain: 

Checkbox : indicates if the todo is already done or not 

Title: should be unique 
Icon: to delete the todo 

Todo list should contain: 
todo items 
Input field on the bottom of the list where the user could add new todo items with that given name 

 
### 'task 2'

A todo item could have sub-todo items. 
After each sub-todo there should be the same logic to add new items like in Task 1. 
 
A sub-todo item should have 

Checkbox : indicates if the todo is already done or not 
Title: should be unique 
Icon: to delete the todo 

Have a wrapper for each todo item. 

The todo item should check or uncheck the selection when clicked anywhere on the wrapper. 
 

Business logic: 

-If the main todo item is clicked and changed to checked then all the sub-todo items should also be checked 
-If the main todo item is clicked and changed to unchecked then all the sub-todo items should also be unchecked 
-If all the sub-todo items are clicked and changed to checked then the main todo item should also be checked 
-If any of the sub-todo items are clicked and changed to unchecked then the main todo item should be unchecked 
-If the main todo item is removed then all the sub-todo items should also be removed 
-If any of the sub-todo items are removed then the main todo should reflect the actual checked state which means: 
-If the removed sub-todo was unchecked and all the others were checked then the main todo will be checked 
Otherwise there will be no change in the main todo 
-If either the todo or sub-todo items are checked then they should differ in color (up to the developer) 

### 'task 3'
Sub-todos can be moved between main todos. 

The same logic should apply to todos' checked state which was describes in task 2. 

### 'task 4'
Todo application state should be stored in localstorage 

OPTIONAL:  
Application could use a relevant single shared store mechanism like Redux, ngRx, Vuex, etc. 
