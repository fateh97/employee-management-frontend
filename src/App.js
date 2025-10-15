import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import MainLayout from './components/MainLayout';
import Employees from './pages/Employees';
import Departments from './pages/Departments';

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
};

  return (
        <Routes>
            {/* Login page is outside the main layout */}
            <Route path="/login" element={<Login onLogin={handleLogin}/>} />
            <Route path="/register" element={<Register />} />

            {/* All pages inside here will have the Navbar */}
            <Route path="/" element={<MainLayout />}> 
                <Route index element={<Dashboard />} /> 
                
                <Route path="dashboard" element={<Dashboard />} /> 
                <Route path="employees" element={<Employees />} />
                <Route path="departments" element={<Departments />} />
            </Route>
        </Routes>
);
}
