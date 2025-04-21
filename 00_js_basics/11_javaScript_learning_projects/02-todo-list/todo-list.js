let todoList = [
  { name: 'Make Dinner', dueDate: '2024-04-22' },
  { name: 'Wash Dishes', dueDate: '2024-04-22' }
];

renderTodo();

function renderTodo() {
  let todoListHTML = '';

todoList.forEach(function (todoObject,index){
      const { name, dueDate } = todoObject; // Shortcut using destructuring
      const html = `
      <div> ${name} </div>
      <div>  ${dueDate} </div>  
      <button class="delete-button" onclick=" 
        todoList.splice(${index},1);
        renderTodo();
      ">Delete</button>
      `;  // Generating the html
      todoListHTML += html;

})


/*   applied the same ;oop using for each fn
  for (let i = 0; i < todoList.length; i++) {
      const todoObject = todoList[i];
      const { name, dueDate } = todoObject; // Shortcut using destructuring
      const html = `
      <div> ${name} </div>
      <div>  ${dueDate} </div>  
      <button class="delete-button" onclick=" 
        todoList.splice(${i},1);
        renderTodo();
      ">Delete</button>
      `;  // Generating the html
      todoListHTML += html;
  }  */
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  let name = inputElement.value;

  const dateInputElement = document.querySelector('.js-dueDate-input');
  let dueDate = dateInputElement.value;

  todoList.push({ name, dueDate });

  inputElement.value = '';  // Reset the textbox to empty
  renderTodo();
}
