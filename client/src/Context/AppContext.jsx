import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Fetch logged-in user info (optional)
  async function getUser() {
    try {
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
    }
  }

  // Fetch user when token changes
  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setUser(null); // clear user when token is removed
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
