import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "../ToDo";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log(isLoggedIn);
    // if (!isLoggedIn) return navigate("/login");
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <Todo />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
