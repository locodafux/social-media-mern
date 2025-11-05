import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

   async function registerUser(e) {
        e.preventDefault();
        const res = await fetch('/auth/register', {
            method: 'post',
            body: JSON.stringify(form),
        });

        const data = await res.json();
        
        if (data.errors) {
            setErrors(data.errors)
        } else {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            navigate("/");
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#060f20] to-[#091427]">
      <div className="bg-[#0b1220] border border-white/5 shadow-2xl rounded-2xl w-full max-w-md p-10 flex flex-col gap-5">
        <h1 className="text-center text-2xl font-bold text-white">
          Create Account
        </h1>
        <p className="text-center text-sm text-[#98a0b3]">
          Join Connect and start building your professional network
        </p>

        <form onSubmit={registerUser} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-transparent border border-white/10 text-white text-sm focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-transparent border border-white/10 text-white text-sm focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-transparent border border-white/10 text-white text-sm focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="password_confirmation"
              className="block mb-2 text-sm font-semibold text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              placeholder="Re-enter your password"
              value={form.password_confirmation}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-transparent border border-white/10 text-white text-sm focus:border-blue-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-3 mt-2 transition transform hover:-translate-y-0.5"
          >
            Register
          </button>
        </form>

        <div className="text-center text-sm mt-3 text-[#98a0b3]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
           Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
