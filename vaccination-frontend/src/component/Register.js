import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUserShield,
} from "react-icons/fa";
import "./FormStyles.css";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    validateForm();
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;
  
    if (!form.name.trim()) newErrors.name = "Name is required.";
    else if (!nameRegex.test(form.name))
      newErrors.name = "Name should contain only letters.";
  
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Invalid email format.";
  
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits.";
  
    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
  
    if (!form.role) newErrors.role = "Please select a role.";
  
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };
  

  const registerUser = async () => {
    try {
      await axios.post("http://localhost:3000/api/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Error registering user";
      alert(msg);
    }
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <h2>Register</h2>

        <div className="input-with-icon">
          <FaUser />
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.name}
          />
        </div>
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <div className="input-with-icon">
          <FaEnvelope />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.email}
          />
        </div>
        {touched.email && errors.email && <p className="error">{errors.email}</p>}

        <div className="input-with-icon">
          <FaPhone />
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.phone}
          />
        </div>
        {touched.phone && errors.phone && <p className="error">{errors.phone}</p>}

        <div className="input-with-icon">
          <FaLock />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.password}
          />
        </div>
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <div className="input-with-icon">
          <FaUserShield />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Role</option>
            <option value="parent">Parent</option>
            <option value="admin">Admin</option>
            <option value="provider">Provider</option>
          </select>
        </div>
        {touched.role && errors.role && <p className="error">{errors.role}</p>}

        <button onClick={registerUser} disabled={!isValid}>
          Register
        </button>

        <p className="link-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
