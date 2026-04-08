import axios from "axios";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); // 👈 navigation hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password, rememberMe }
      );

      // ✅ SAVE AUTH DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");

      // ✅ REDIRECT TO HOME PAGE
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
  <div className="login-page">
    <div className="login-card">
      <form onSubmit={login}>
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Login to continue</p>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="login-options">
          <label>
            <input
              type="checkbox"
              onChange={e => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>

          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="login-footer">
          New user? <a href="/register">Create account</a>
        </p>
      </form>
    </div>
  </div>
);

}
