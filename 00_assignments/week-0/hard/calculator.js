/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/
class Calculator {
  constructor() {
    this.result = 0;
  }

  // Adds a number to the result
  add(num) {
    this.result += num;
  }

  // Subtracts a number from the result
  subtract(num) {
    this.result -= num;
  }

  // Multiplies the result by a number
  multiply(num) {
    this.result *= num;
  }

  // Divides the result by a number
  divide(num) {
    if (num === 0) {
      throw new Error("Cannot divide by zero");
    }
    this.result /= num;
  }

  // Clears the result (sets it to 0)
  clear() {
    this.result = 0;
  }

  // Returns the current result
  getResult() {
    return this.result;
  }

  // Parses and evaluates an arithmetic expression
  calculate(expression) {
    // Remove all spaces from the expression
    expression = expression.replace(/\s+/g, "");

    // Check if the expression contains invalid characters
    if (/[^0-9+\-*/().]/.test(expression)) {
      throw new Error("Invalid characters in the expression");
    }

    // Check for division by zero before evaluating the expression
    if (expression.includes("/0")) {
      throw new Error("Cannot divide by zero");
    }

    // Use JavaScript's built-in `eval()` to calculate the expression
    try {
      this.result = eval(expression);
      if (isNaN(this.result)) {
        throw new Error("Invalid expression");
      }
    } catch (e) {
      throw new Error("Error in evaluating expression");
    }

    return this.result;
  }
}
// Solved by CHATGPT

module.exports = Calculator;
