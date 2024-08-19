import { useState, useEffect } from "react";
import axios from "axios";
import "./ToDo.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const token = localStorage.getItem("jwtToken"); // Assuming the JWT token is stored in localStorage

  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/todos`, // Replace with your backend URL
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch todos when component mounts
  useEffect(() => {
    axiosInstance
      .get("/")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, title: e.target.value });
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    axiosInstance
      .post("/", { title: newTodo })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  const deleteTodo = (id) => {
    axiosInstance
      .delete(`/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const editTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const updateTodo = (e) => {
    e.preventDefault();
    if (currentTodo.title.trim() === "") return;

    axiosInstance
      .put(`/${currentTodo._id}`, {
        title: currentTodo.title,
        completed: currentTodo.completed,
      })
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo._id === currentTodo._id ? response.data : todo
          )
        );
        setIsEditing(false);
        setCurrentTodo({});
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <form onSubmit={isEditing ? updateTodo : addTodo}>
        <input
          type="text"
          value={isEditing ? currentTodo.title : newTodo}
          onChange={isEditing ? handleEditInputChange : handleInputChange}
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => editTodo(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
