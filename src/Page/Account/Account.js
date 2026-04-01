import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import "./Account.css";

function Account() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Find user with matching email and password
      const user = users.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (user) {
        // Store logged in user info
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Login Success!");
        navigate("/home");
        window.location.reload();
      } else {
        alert("Invalid email or password!");
      }
    } catch (err) {
      alert("Login Error");
    }
  };

  return (
    <>
      <h1 className="title">로그인</h1>
      <div className="login-title">
        <div className="login">
          <CiLogin />
        </div>
        <div className="info-login">
          <h3 className="fix-login">Email</h3>
          <input
            className="fix-login"
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <h3 className="fix-login">Password</h3>
          <input
            className="fix-login"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            className="button-login fix-login"
            type="button"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <Link to="/register" className="Link-css register-login fix-login">
            For Register?
          </Link>
        </div>
      </div>
    </>
  );
}

export default Account;
