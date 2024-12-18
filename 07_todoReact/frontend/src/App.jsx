import { useState, useEffect } from "react";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch("http://localhost:8000/todos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch todos");
        return res.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const markAsComplete = (id) => {
    fetch("http://localhost:8000/complete", {
      method: "PUT",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update todo");
        return res.json();
      })
      .then(() => {
        fetchTodos();
      })
      .catch((error) => {
        console.error("Error marking todo as complete:", error);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#151b23",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "0",
        margin: "0",
        minHeight: "100vh",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}>
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
          padding: "20px",
          boxSizing: "border-box",
        }}>
        <CreateTodo onTodoCreated={fetchTodos} />
        <Todos todos={todos} onComplete={markAsComplete} />
      </div>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
          }
        `}
      </style>
    </div>
  );
}

export default App;
