import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Users,
  MessageSquare,
  Bell,
  Briefcase,
  Settings,
  Search,
  Menu,
  X,
} from "lucide-react";

export default function Topbar({ query, setQuery, handleSearch }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0b1220]/90 backdrop-blur-md shadow-[0_2px_15px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* 🧩 LOGO */}
        <Link to="/">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-extrabold">
            C
          </div>
          <h1 className="text-lg font-semibold hidden sm:block">Connect</h1>
        </div>
        </Link>

        {/* 🔍 SEARCH BAR — show only in Home and larger screens */}
        {isHome && (
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center gap-2 bg-white/[0.08] rounded-lg px-3 py-1.5 w-full max-w-[420px]"
          >
            <Search className="w-5 h-5 text-[#98a0b3]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts or people..."
              className="flex-1 bg-transparent outline-none text-[#e6eef8] placeholder-[#98a0b3]"
            />
          </form>
        )}

        {/* 🔗 NAV ICONS — Desktop */}
        <nav className="hidden sm:flex items-center gap-5 text-[#98a0b3]">
          <Link to="/" className="hover:text-blue-400">
            <HomeIcon className="w-5 h-5" />
          </Link>
          <Link to="/networks" className="hover:text-blue-400">
            <Users className="w-5 h-5" />
          </Link>
          <Link to="/messages" className="hover:text-blue-400">
            <MessageSquare className="w-5 h-5" />
          </Link>
          <Link to="/notifications" className="hover:text-blue-400">
            <Bell className="w-5 h-5" />
          </Link>
          <Link to="/jobs" className="hover:text-blue-400">
            <Briefcase className="w-5 h-5" />
          </Link>
          <Link to="/settings" className="hover:text-blue-400">
            <Settings className="w-5 h-5" />
          </Link>
        </nav>

        {/* 📱 Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-[#98a0b3] hover:text-blue-400 transition"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-[#0b1220]/95 border-t border-white/10">
          {isHome && (
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 bg-white/[0.08] rounded-lg mx-4 my-3 px-3 py-2"
            >
              <Search className="w-5 h-5 text-[#98a0b3]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent outline-none text-[#e6eef8] placeholder-[#98a0b3]"
              />
            </form>
          )}

          <nav className="flex flex-col gap-3 px-6 py-4 text-[#98a0b3] text-sm">
            <Link to="/" className="hover:text-blue-400 flex items-center gap-3">
              <HomeIcon className="w-5 h-5" /> Home
            </Link>
            <Link to="/networks" className="hover:text-blue-400 flex items-center gap-3">
              <Users className="w-5 h-5" /> Networks
            </Link>
            <Link to="/messages" className="hover:text-blue-400 flex items-center gap-3">
              <MessageSquare className="w-5 h-5" /> Messages
            </Link>
            <Link to="/notifications" className="hover:text-blue-400 flex items-center gap-3">
              <Bell className="w-5 h-5" /> Notifications
            </Link>
            <Link to="/jobs" className="hover:text-blue-400 flex items-center gap-3">
              <Briefcase className="w-5 h-5" /> Jobs
            </Link>
            <Link to="/settings" className="hover:text-blue-400 flex items-center gap-3">
              <Settings className="w-5 h-5" /> Settings
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
