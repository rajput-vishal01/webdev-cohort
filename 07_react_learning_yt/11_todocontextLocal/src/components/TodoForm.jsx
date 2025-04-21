import React from "react";
import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false });
    setTodo("");
  };
  return (
    <form onSubmit={add} className="flex shadow-md rounded-lg overflow-hidden">
      <input
        type="text"
        placeholder="Write your todo..."
        className="w-full border-none px-4 py-2 outline-none bg-gray-100 text-gray-700 focus:bg-white focus:ring-2 focus:ring-green-400 duration-200"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 duration-200">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
