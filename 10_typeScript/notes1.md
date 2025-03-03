# TypeScript Short Notes (Topics 1-10)

This document provides detailed explanations of key TypeScript topics, from the basics to modules. It is designed as a set of comprehensive notes to guide you from the fundamentals through to intermediate concepts in TypeScript.

---

## 1. Introduction to TypeScript

**What is TypeScript?**  
TypeScript is a statically typed superset of JavaScript developed by Microsoft. It adds optional types, classes, interfaces, and many other features that help developers write robust and maintainable code.

**Why Use TypeScript?**  
- **Early Error Detection:** Catches type-related errors at compile time, reducing runtime issues.
- **Enhanced Tooling:** Improves code editor support with autocompletion, navigation, and refactoring.
- **Scalability:** Facilitates the development of large-scale applications by enforcing strict typing and structured code.
- **Interoperability:** Fully compatible with JavaScript, enabling gradual adoption in existing projects.

---

## 2. Installation and Setup

**Installing TypeScript**  
TypeScript can be installed globally using npm:
```bash
npm install -g typescript
```
Or added as a development dependency in your project:
```bash
npm install --save-dev typescript
```

**Project Initialization**  
Initialize your TypeScript project by creating a `tsconfig.json` file:
```bash
tsc --init
```
This file configures options such as the target ECMAScript version, module system, and compiler settings.

**Development Environment**  
Modern code editors like Visual Studio Code offer excellent TypeScript support, including real-time error checking and IntelliSense.

---

## 3. Basic Types

**Primitive Types**  
TypeScript includes standard JavaScript types like:
- `string`
- `number`
- `boolean`
- `null` and `undefined`
- `symbol`

**Complex Types**  
Beyond primitives, TypeScript supports arrays, tuples, and objects.  
For example:
```typescript
let names: string[] = ["Alice", "Bob", "Charlie"];
let point: [number, number] = [10, 20];
```

**Type Annotations and Inference**  
Explicitly declaring types enhances code readability and error detection:
```typescript
let message: string = "Hello, TypeScript!";
```
TypeScript can also infer types based on assigned values when annotations are omitted.

---

## 4. Functions & Arrow Functions

**Function Declarations**  
Functions can include type annotations for parameters and return values:
```typescript
function add(a: number, b: number): number {
    return a + b;
}
```

**Arrow Functions**  
Arrow functions offer a concise syntax and lexically bind the `this` keyword:
```typescript
const multiply = (a: number, b: number): number => a * b;
```

**Optional and Default Parameters**  
You can specify optional parameters using `?` and provide default values:
```typescript
function greet(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}
```

---

## 5. Interfaces

**Defining Interfaces**  
Interfaces define contracts for objects, ensuring they follow a specific structure:
```typescript
interface User {
    id: number;
    name: string;
    email?: string; // Optional property
}
```

**Using Interfaces**  
They help in type-checking objects and function parameters:
```typescript
function getUserInfo(user: User): string {
    return `User ${user.id}: ${user.name}`;
}
```

**Extending Interfaces**  
Interfaces can extend one another, allowing for more complex types:
```typescript
interface Admin extends User {
    role: string;
}
```

---

## 6. Classes & Inheritance

**Classes in TypeScript**  
Classes serve as blueprints for creating objects, encapsulating properties and methods:
```typescript
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    greet(): string {
        return `Hello, ${this.name}`;
    }
}
```

**Inheritance**  
Classes can inherit properties and methods from other classes using the `extends` keyword:
```typescript
class Employee extends Person {
    employeeId: number;
    constructor(name: string, employeeId: number) {
        super(name);
        this.employeeId = employeeId;
    }
}
```

**Access Modifiers**  
Control access to class members:
- `public`: Accessible anywhere (default).
- `private`: Accessible only within the class.
- `protected`: Accessible within the class and its subclasses.

---

## 7. Generics

**What are Generics?**  
Generics allow you to create components that work with any data type while ensuring type safety. They help avoid repetitive code by making functions, classes, and interfaces flexible.

**Generic Functions and Classes**  
For example, a generic identity function:
```typescript
function identity<T>(arg: T): T {
    return arg;
}
```
And a generic class:
```typescript
class Box<T> {
    content: T;
    constructor(content: T) {
        this.content = content;
    }
}
```

---

## 8. Enums

**Defining Enums**  
Enums create a set of named constants, which can be numeric or string-based:
```typescript
enum Direction {
    Up,
    Down,
    Left,
    Right
}
```

**String Enums**  
For more descriptive values:
```typescript
enum Status {
    Success = "SUCCESS",
    Failure = "FAILURE"
}
```

**Usage**  
Enums enhance code readability and ensure that only predefined values are used.

---

## 9. Advanced Types

**Union Types**  
Union types allow a variable to hold one of several types:
```typescript
function format(value: string | number): string {
    return value.toString();
}
```

**Intersection Types**  
Combine multiple types into one:
```typescript
type PersonDetails = Person & { age: number };
```

**Type Aliases**  
Create custom names for complex types:
```typescript
type ID = string | number;
```

**Type Guards**  
Implement functions to narrow down union types:
```typescript
function isString(value: any): value is string {
    return typeof value === 'string';
}
```

---

## 10. Modules & Namespaces

**Modules**  
Modern TypeScript uses ES6 modules to organize code across multiple files. Use `export` to share code and `import` to include it:
```typescript
// math.ts
export function add(a: number, b: number): number {
    return a + b;
}

// main.ts
import { add } from './math';
console.log(add(2, 3));
```

**Namespaces**  
Namespaces group related code in a single global scope. They are more common in legacy code:
```typescript
namespace Utilities {
    export function log(message: string): void {
        console.log(message);
    }
}
Utilities.log("Hello from namespace!");
```
*Note:* Modern TypeScript projects prefer modules over namespaces for better modularity and maintenance.
