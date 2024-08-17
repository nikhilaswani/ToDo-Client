// src/components/Todo.js

import { useState, useEffect } from "react";
import "./ToDo.css";

const Todo = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [newTodo, setNewTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const newTodos = [...todos, { id: Date.now(), text: newTodo }];
    setTodos(newTodos);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const editTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const updateTodo = (e) => {
    e.preventDefault();
    if (currentTodo.text.trim() === "") return;

    const updatedTodos = todos.map((todo) =>
      todo.id === currentTodo.id ? currentTodo : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
    setCurrentTodo({});
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <form onSubmit={isEditing ? updateTodo : addTodo}>
        <input
          type="text"
          value={isEditing ? currentTodo.text : newTodo}
          onChange={isEditing ? handleEditInputChange : handleInputChange}
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => editTodo(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
