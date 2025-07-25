import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./FormStyles.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/login", form);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
       localStorage.setItem("userId", user.id); // ✅ Set userId for future access (e.g., add child)

      // 🔁 Navigate based on user role
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "parent") {
           // ✅ Save userId to localStorage
          // localStorage.setItem("userId", user._id);  // <--- ADD THIS
         navigate("/parent-dashboard");
    }else {
        navigate("/provider-dashboard");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <h2>Login</h2>

        <div className="input-with-icon">
          <FaEnvelope />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
          />
        </div>

        <div className="input-with-icon">
          <FaLock />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
          />
        </div>

        <button onClick={loginUser} disabled={!form.email || !form.password}>
          Login
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="link-text">
          Not registered?{" "}
          <span onClick={() => navigate("/register")}>Create an account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
