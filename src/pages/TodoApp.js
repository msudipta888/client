import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Todo.css";
//import ThreeDBackground from "../ThreeDBackground";
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get("http://localhost:5000/api/todos", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/todos",
      { text: newTodo },
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    setTodos([...todos, response.data]);
    setNewTodo("");
  };
  const cancelTodo = () => {
    setEditingId(null);
    setEditingText("");
  };
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };
  const updateTodo = async (id, editingText) => {
    const response = await axios.put(
      `http://localhost:5000/api/todos/${id}`,
      { text: editingText },
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    setEditingId(null);
    setEditingText("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="app-container">
      {/* <ThreeDBackground/> */}
      <div className="todo-container">
        <h1>Todo List</h1>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="todo-input"
        />
        <button onClick={addTodo} className="add-button">
          Add Todo
        </button>
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo._id}>
                {editingId === todo._id ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => {
                        setEditingText(e.target.value);
                      }}
                    />
                    <button onClick={() => updateTodo(todo._id, editingText)}>
                      Save
                    </button>
                    <button onClick={cancelTodo}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{todo.text}</span>
                    <button onClick={() => startEditing(todo._id, todo.text)}>
                      Edit
                    </button>
                    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
