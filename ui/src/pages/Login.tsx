import React, { useState } from "react";
import { useAuth } from "../components/AuthComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        {
          username,
          password,
        }
      );

      const token = response.data.token;
      login(token);
      navigate("/events");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
        <p className="link-text">
          Don't have an account? <a href="/register" className="link">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
