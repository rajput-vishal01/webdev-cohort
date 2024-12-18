import React, { useState } from "react";

function CreateTodo({ onTodoCreated }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/todo", {
        method: "POST",
        body: JSON.stringify({
          title,
          description: desc,
          completed: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to add todo");
      }

      const json = await response.json();

      if (onTodoCreated) {
        onTodoCreated();
      }

      setTitle("");
      setDesc("");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to create todo. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          padding: "10px",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "300px",
        }}
      />
      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
        style={{
          padding: "10px",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "300px",
        }}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          borderRadius: "5px",
          fontSize: "1rem",
        }}>
        {isSubmitting ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
}

export default CreateTodo;
