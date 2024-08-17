import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (username === "username" && password === "password") {
        // localStorage.setItem(13.201.32.119"isLoggedIn", "true");
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
      localStorage.jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjY3MTJhYzY0OTJkMzVjYjUyZGQ3NTciLCJpYXQiOjE3MTgwMzEwMjEsImV4cCI6MTcxODAzNDYyMX0.RZSY1ji_kjAi-bJ5C7yHj-QGZVw-JXY8yuCw13c_4pE";
      const response = await axios.post(
        "http://13.201.32.119:3000/auth/login",
        {
          username,
          password,
          // Headers: {
          //   Authorization: `Bearer ${localStorage.jwtToken}`,
          // },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  // Basic validation (in a real app, you would validate against a database)
  // if (username === "username" && password === "password") {
  //   localStorage.setItem("isLoggedIn", "true");
  //   navigate("/");
  // } else {
  //   alert("Invalid credentials");
  // }

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={navigateToSignup}>Go to Signup</button>
    </div>
  );
};

export default Login;
