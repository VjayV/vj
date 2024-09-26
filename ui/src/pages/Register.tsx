import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import './Login.css'; 

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (strongPasswordRegex.test(password)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordStrength !== "Strong") {
      toast.error("Please enter a stronger password.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/register`,
        {
          username,
          password,
        }
      );

      toast.success(response.data.message);
      navigate("/login");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(`Registration failed: ${err.response.data.error}`);
      } else {
        toast.error("An unexpected error occurred during registration.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="title-login">Register</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Enter a strong password"
            className="form-input"
          />
        </div>
        <small>
          Password must be at least 8 characters long, and include an
          uppercase letter, a lowercase letter, a number, and a special
          character.
        </small>
        {password && (
          <div>
            <strong>Password Strength: {passwordStrength}</strong>
          </div>
        )}
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
