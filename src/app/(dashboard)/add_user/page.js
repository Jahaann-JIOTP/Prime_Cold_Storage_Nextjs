"use client";
import { useState } from "react";

export default function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const roles = ["Admin", "Operator", "Observer", "Viewer"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add submit logic (API call)
    alert(`User Added:\n${JSON.stringify(form, null, 2)}`);
    setForm({ name: "", email: "", password: "", role: "" });
  };

  return (
    <div className="relative flex items-center justify-center min-h-[85vh] p-6 pt-0">
      {/* Frozen Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://cdn.vectorstock.com/i/500p/27/89/freezy-ice-surface-horizontal-background-natural-vector-53782789.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          filter: "blur(2px)",
        }}
      />
      {/* <div className="absolute inset-0 bg-cyan-100/20 backdrop-blur-[4px]"></div> */}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-
         max-w-lg p-6 rounded-xl shadow-2xl bg-white/10 backdrop-blur-lg border border-cyan-200"
      >
        <h2 className="text-center text-lg font-bold text-white mb-5">
          Add New User
        </h2>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 rounded bg-white/20 border border-cyan-300 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 rounded bg-white/20 border border-cyan-300 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 rounded bg-white/20 border border-cyan-300 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {/* Role Dropdown */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full mb-5 p-2 rounded bg-white/20 border border-cyan-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option className="text-black" value="">Select Role</option>
          {roles.map((role, index) => (
            <option className="text-black" key={index} value={role}>
              {role}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 font-bold rounded bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg transition"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
