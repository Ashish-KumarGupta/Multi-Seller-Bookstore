import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Register</h3>
      <form onSubmit={handleSubmit} className="col-md-5">
        <input className="form-control mb-3" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input className="form-control mb-3" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="form-control mb-3" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select className="form-control mb-3" name="role" value={form.role} onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
