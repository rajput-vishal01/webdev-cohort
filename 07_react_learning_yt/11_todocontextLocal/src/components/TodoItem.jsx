import React from "react";
import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center border border-gray-200 rounded-lg px-4 py-2 gap-x-3 shadow-md hover:shadow-lg transition-shadow duration-300 ${
        todo.completed ? "bg-green-100" : "bg-gray-100"
      }`}>
      {/* Checkbox */}
      <input
        type="checkbox"
        className="cursor-pointer w-5 h-5 accent-green-500"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* Todo Text */}
      <input
        type="text"
        className={`flex-grow text-gray-800 rounded-lg bg-transparent outline-none ${
          isTodoEditable ? "border border-gray-300 px-2 py-1" : "border-none"
        }`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Edit Button */}
      <button
        className={`flex justify-center items-center w-8 h-8 rounded-lg border text-gray-700 ${
          todo.completed
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}>
        {isTodoEditable ? "✔️" : "✏️"}
      </button>

      {/* Delete Button */}
      <button
        className="flex justify-center items-center w-8 h-8 rounded-lg bg-red-500 text-white hover:bg-red-600"
        onClick={() => deleteTodo(todo.id)}>
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
