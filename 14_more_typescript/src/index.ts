// interface User {
//   id: string;
//   name: string;
//   age: string;
//   email: string;
//   password: string;
// }

// // // help us to pick selected values using generic by maintaining single source of truth
// // Selecting 'name', 'age', and 'email' properties from User
// type UpdateProps = Pick<User, "name" | "age" | "email">;

// // Making the selected properties optional
// type UpdatePropsOptional = Partial<UpdateProps>;

// // Function that accepts an object with optional 'name', 'age', and 'email' properties
// function updateUser(updatedProps: UpdatePropsOptional) {
//   // hit the database to update the user
// }

// // Example usage of updateUser
// updateUser({ name: "Alice" }); // Only updating the name
// updateUser({ age: "30", email: "alice@example.com" }); // Updating age and email
// updateUser({}); // No updates, but still a valid call

// type User2 = {
//   name: string;
//   readonly age: number; // disables updating
// };

// const user: User2 = {
//   name: "vish",
//   age: 21,
// };

// const user2: Readonly<User2> = {
//   name: "vish",
//   age: 21,
// }; // whole obj is read only

// // user.age = 12

// interface User {
//   id: string;
//   name: string;
// }

// // Using Record to type an object with string keys and User values
// type Users = Record<string, User>;

// const users: Users = {
//   'abc123': { id: 'abc123', name: 'John Doe' },
//   'xyz789': { id: 'xyz789', name: 'Jane Doe' },
// };

// console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }

// interface User {
//   id: string;
//   name: string;
// }

// // Initialize an empty Map with string keys and User values
// const usersMap = new Map<string, User>();

// // Add users to the map using .set
// usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
// usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });

// // Accessing a value using .get
// console.log(usersMap.get('abc123')); // Output: { id: 'abc123', name: 'John Doe' }

// type EventType = "click" | "scroll" | "mousemove";

// // Using Exclude to create a new type without 'scroll'
// type ExcludeEvent = Exclude<Event, "scroll">; 

// // Function that accepts only 'click' and 'mousemove' events
// const handleEvent = (event: ExcludeEvent) => {
//   //fn logic
//   console.log(`Handling event: ${event}`);
// };

