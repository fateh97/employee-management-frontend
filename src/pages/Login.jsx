import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/login", {
                email,
                password,
            });
            localStorage.setItem("token", res.data.access_token);
            onLogin(res.data.user);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid email or password");
            console.error("Login error:", err.response || err.message);
        }
        console.log("Login attempted");
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don’t have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
}
