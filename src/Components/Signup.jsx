import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Signup.css";

const Signup = () => {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");
  console.log(token);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        username,
        password,
      });
      console.log(response);
      //  token = response.data.token;
      const jwtToken = response.data.token;
      // console.log(token);
      console.log(jwtToken);
      localStorage.setItem("jwtToken", jwtToken);
      setToken(jwtToken);

      // localStorage.setItem("user", JSON.stringify({ email, password }));
      alert("Signup successful");
      navigate("/");
    } catch (error) {
      console.error("Signup failed", error);
    }
    // e.preventDefault();

    // localStorage.setItem("user", JSON.stringify({ email, password }));
    // alert("Signup successful");
    // navigate("/login");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signup-form">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>
      <button onClick={navigateToLogin}>Go to Login</button>
    </div>
  );
};

export default Signup;
