import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const toastId = toast("Login started", {
        type: "default",
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: true,
        theme: "light",
        isLoading: true,
        transition: Bounce,
      });
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username,
          password,
          // Headers: {
          //   Authorization: `Bearer ${localStorage.jwtToken}`,
          // },
        }
      );
      if (response.data.success) {
        const jwtToken = response.data.token;
        // console.log(token);
        console.log(jwtToken);
        localStorage.setItem("jwtToken", jwtToken);
        // alert("Login successful");

        // toast.success("Login successfull", {
        //   position: "bottom-right",
        //   autoClose: 5000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: false,
        //   // progress: undefined,
        //   theme: "light",
        //   transition: Bounce,
        // });

        toast.update(toastId, {
          render: "Login completed",
          type: "success",
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: false,
          theme: "light",
          isLoading: false,
          transition: Bounce,
        });
        navigate("/");
        return;
      }
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
