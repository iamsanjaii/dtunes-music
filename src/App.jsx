import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/login";
import { useEffect, useState } from "react";
import { auth } from "./Firebase/firebaseconfig";
import Admin from "./Pages/admin";
import Register from "./Pages/register";
import Musicapp from "./Pages/musicapp";

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/app" /> : <Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app/*" element={<Musicapp />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
