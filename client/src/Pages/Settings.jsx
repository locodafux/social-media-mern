import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/Context/AppContext";

export default function Settings() {
  const [username, setUsername] = useState("Leonardo");
  const [email, setEmail] = useState("leonardo@example.com");
  const [language, setLanguage] = useState("English");
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const saveSettings = () => {
    alert("✅ Your settings have been saved successfully!");
  };

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center  text-gray-100 font-inter transition-colors duration-300"
    >
      {/* ⚙️ Settings Container */}
      <main className="w-full max-w-3xl px-6 pb-16 flex flex-col gap-8 mt-4">
        {/* Profile Section */}
        <section className="bg-[#0b1220]/90 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold border-b border-white/10 pb-3 mb-5">
            👤 Profile Information
          </h2>

          <div className="flex flex-col gap-5">
            <InputField
              label="Username"
              value={username}
              onChange={setUsername}
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <SelectField
              label="Language"
              value={language}
              onChange={setLanguage}
              options={["English", "Filipino", "Spanish"]}
            />
          </div>
        </section>

        {/* Privacy Section */}
        <section className="bg-[#0b1220]/90 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold border-b border-white/10 pb-3 mb-5">
            🔒 Privacy Settings
          </h2>

          <div className="flex flex-col gap-4">
            <ToggleRow
              label="Show Online Status"
              checked={onlineStatus}
              onChange={() => setOnlineStatus(!onlineStatus)}
            />
            <ToggleRow
              label="Receive Email Notifications"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
            />
          </div>
        </section>

        {/* Theme Section */}
        <section className="bg-[#0b1220]/90 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold border-b border-white/10 pb-3 mb-5">
            🎨 Appearance
          </h2>

          <ToggleRow
            label="Enable Dark Mode"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </section>

        {/* Save Button */}
        <div className="flex justify-end gap-x-2">
          <button
            onClick={logout}
            className="bg-gray-500 hover:bg-gray-600 transition text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg"
          >
            Logout
          </button>
            <button
            onClick={saveSettings}
            className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}

/* ✅ Reusable toggle switch row */
function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
      </label>
    </div>
  );
}

/* ✅ Reusable Input Field */
function InputField({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}

/* ✅ Reusable Select Field */
function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
