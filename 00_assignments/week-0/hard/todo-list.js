/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/
class Todo {
  constructor() {
    this.todos = []; // List to hold all todo items
  }

  // Add a new todo to the list
  add(todo) {
    if (typeof todo !== "string" || todo.trim() === "") {
      throw new Error("Todo must be a non-empty string");
    }
    this.todos.push(todo);
  }

  // Remove the todo at a specific index
  remove(indexOfTodo) {
    if (
      !Number.isInteger(indexOfTodo) ||
      indexOfTodo < 0 ||
      indexOfTodo >= this.todos.length
    ) {
      // Silently ignore invalid indexes
      return;
    }
    this.todos.splice(indexOfTodo, 1);
  }

  // Update a todo at a specific index
  update(index, updatedTodo) {
    if (!Number.isInteger(index) || index < 0 || index >= this.todos.length) {
      // Silently ignore invalid indexes
      return;
    }
    if (typeof updatedTodo !== "string" || updatedTodo.trim() === "") {
      throw new Error("Todo must be a non-empty string");
    }
    this.todos[index] = updatedTodo;
  }

  // Get all todos
  getAll() {
    return [...this.todos]; // Return a copy to avoid mutation
  }

  // Get a specific todo by its index
  get(indexOfTodo) {
    if (
      !Number.isInteger(indexOfTodo) ||
      indexOfTodo < 0 ||
      indexOfTodo >= this.todos.length
    ) {
      return null; // Return null for invalid indexes
    }
    return this.todos[indexOfTodo];
  }

  // Clear all todos from the list
  clear() {
    this.todos = [];
  }
}

//Solved by CHATGPT

module.exports = Todo;
