import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 new loading state

  // Fetch logged-in user info (optional)
  async function getUser() {
    try {
      setLoading(true); // start loading
      const res = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
      } else {
        console.error("Failed to fetch user:", data);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false); // stop loading
    }
  }

  // Fetch user when token changes
  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setUser(null);
      setLoading(false); // no token → not loading
    }
  }, [token]);

  // Global loading screen (optional)
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser, loading }}>
      {children}
    </AppContext.Provider>
  );
}
