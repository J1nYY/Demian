import { FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      // Check if passwords match
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const response = await fetch("http://localhost:8001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          confirm_password: form.confirmPassword,
        }),
      });

      if (response.ok) {
        alert("Register Success!");
        navigate("/account");
      } else {
        const data = await response.json();
        console.log("[서버 응답]", data);
        alert(data.detail || "Registration failed");
      }
    } catch (err) {
      alert("Registration Error");
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="title">Register</h1>
      <div className="login-title">
        <div className="login login2">
          <FaUserPlus />
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
          <h3 className="fix-login">Confirm Password</h3>
          <input
            className="fix-login"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <button
            className="button-login fix-login"
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
