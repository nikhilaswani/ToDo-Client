import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const toastId = toast("Signup started", {
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
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          username,
          password,
        }
      );
      if (response.data.success) {
        const jwtToken = response.data.token;
        // console.log(token);
        console.log(jwtToken);
        localStorage.setItem("jwtToken", jwtToken);

        toast.update(toastId, {
          render: "Signup completed",
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

        // alert("Signup successful");
        navigate("/");
        return;
      }

      //  token = response.data.token;

      // localStorage.setItem("user", JSON.stringify({ email, password }));
    } catch (error) {
      console.error("Signup failed", error);
      alert("unsuccessful");
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
