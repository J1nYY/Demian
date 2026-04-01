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

      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check if email already exists
      if (existingUsers.some((user) => user.email === form.email)) {
        alert("Email already registered!");
        return;
      }

      // Add new user
      const newUser = {
        email: form.email,
        password: form.password,
      };

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      alert("Register Success!");
      navigate("/account"); // Redirect to login page
    } catch (err) {
      alert("Registration Error");
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
