import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://raja-fashion-clothing.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Create Account</h2>

        <form onSubmit={signup}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Sign Up
          </button>
        </form>

        <div className="register-footer">
          Already have an account?{" "}
          <span
            style={{ color: "#ff9900", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
