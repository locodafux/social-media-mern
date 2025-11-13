import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext, default as AppProvider } from "./Context/AppContext";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import MyNetwork from "./Pages/MyNetwork";
import Messages from "./Pages/Messages";
import Notifications from "./Pages/Notifications";
import Jobs from "./Pages/Jobs";
import Settings from "./Pages/Settings";
import "./App.css";

function AppContent() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public routes */}
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Home />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="networks" element={<MyNetwork />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 🚧 Catch-all route (optional) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
