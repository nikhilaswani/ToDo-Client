import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import HomePage from "./Components/HomePage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            exact
            path="/"
            // render={() =>
            //   isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />
            // }
            element={<HomePage />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
