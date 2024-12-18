import React from "react";

function Todos({ todos = [], onComplete }) {
  return (
    <div>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo._id}
            style={{
              backgroundColor: "#1e2632",
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}>
            <div>
              <h1
                style={{
                  margin: "0 0 5px 0",
                  fontSize: "1.2rem",
                  color: "white",
                }}>
                {todo.title}
              </h1>
              <h2
                style={{
                  margin: "0",
                  fontSize: "1rem",
                  color: "#ccc",
                }}>
                {todo.description}
              </h2>
            </div>
            <button
              onClick={() => onComplete(todo._id)}
              disabled={todo.completed}
              style={{
                backgroundColor: todo.completed ? "gray" : "#4CAF50",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: todo.completed ? "not-allowed" : "pointer",
                borderRadius: "5px",
                fontSize: "1rem",
                outline: "none",
              }}>
              {todo.completed ? "Completed" : "Mark As Complete"}
            </button>
          </div>
        ))
      ) : (
        <p style={{ color: "white", textAlign: "center", fontSize: "1rem" }}>
          No todos available. Add some!
        </p>
      )}
    </div>
  );
}

export default Todos;
