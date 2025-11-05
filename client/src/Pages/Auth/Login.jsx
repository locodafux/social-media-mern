import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }
    alert(`Welcome back! You are now logged in as ${email}.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#060f20] to-[#091427] text-[#e6eef8]">
      <div className="bg-[#0b1220] border border-white/5 shadow-[0_4px_40px_rgba(0,0,0,0.4)] rounded-2xl p-10 w-full max-w-md flex flex-col gap-5">
        <h1 className="text-center text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-center text-sm text-[#98a0b3] mb-4">
          Log in to continue your professional journey
        </p>

        <form onSubmit={loginUser} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-3 rounded-lg bg-transparent border border-white/10 focus:border-blue-500 outline-none text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-3 rounded-lg bg-transparent border border-white/10 focus:border-blue-500 outline-none text-sm"
            />
          </div>

          <div className="text-right text-xs mt-[-6px] mb-2">
            <a
              href="#"
              className="text-blue-500 hover:underline transition"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-3 font-semibold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-transform"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm mt-2">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
