import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastComponent } from "@/Components/Toast";
import { AppContext } from "@/Context/AppContext"; // 👈 import your context

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const { setToken } = useContext(AppContext); // 👈 access context setter

  // ✅ Always trigger toast even with the same message
  function showToast(message, type) {
    setToast(null);
    setTimeout(() => {
      setToast({ message, type });
    }, 50);
  }

  async function loginUser(e) {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please enter your email and password.", "error");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.errors) {
        const formattedErrors = {};
        data.errors.forEach((err) => {
          formattedErrors[err.path] = err.msg;
        });
        setErrors(formattedErrors);
        showToast("Login failed!", "error");
        return;
      }

      if (!res.ok) {
        showToast(data.message || "Invalid credentials.", "error");
        return;
      }

      // ✅ Successful login
      localStorage.setItem("token", data.token);
      setToken(data.token); // 👈 instantly update context
      setErrors({});
      clearForm();
      showToast("Login successful!", "success");

      // Small delay so toast shows before redirect (optional)
      setTimeout(() => navigate("/"), 300);
    } catch (error) {
      console.error("Login error:", error);
      showToast("Something went wrong. Please try again.", "error");
    }
  }

  function clearForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#060f20] to-[#091427]">
      {/* ✅ Toast */}
      {toast && (
        <ToastComponent
          key={toast.message + toast.type}
          message={toast.message}
          type={toast.type}
        />
      )}

      <div className="bg-[#0b1220] border border-white/5 shadow-2xl rounded-2xl w-full max-w-md p-10 flex flex-col gap-5">
        <h1 className="text-center text-2xl font-bold text-white">Welcome Back</h1>
        <p className="text-center text-sm text-[#98a0b3]">
          Log in to continue your professional journey
        </p>

        <form onSubmit={loginUser} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className={`w-full p-3 rounded-lg bg-transparent border text-white text-sm focus:border-blue-500 outline-none transition ${
                errors.email
                  ? "border-red-400 bg-red-400/10 placeholder-red-300"
                  : "border-white/10"
              }`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                <span className="font-medium">Heads up:</span> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              className={`w-full p-3 rounded-lg bg-transparent border text-white text-sm focus:border-blue-500 outline-none transition ${
                errors.password
                  ? "border-red-400 bg-red-400/10 placeholder-red-300"
                  : "border-white/10"
              }`}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                <span className="font-medium">Heads up:</span> {errors.password}
              </p>
            )}
          </div>

          <div className="text-right text-xs mt-[-6px] mb-2">
            <a href="#" className="text-blue-400 hover:underline transition">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-3 mt-2 transition transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm mt-3 text-[#98a0b3]">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 font-semibold hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
