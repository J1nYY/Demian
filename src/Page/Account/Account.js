import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import "./Account.css";

function Account({setIsLoggedIn}) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.detail || "로그인 실패");
        return;
      }

      const data = await res.json();
      await setIsLoggedIn(true);
      alert(data.message);
      navigate("/home");
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
