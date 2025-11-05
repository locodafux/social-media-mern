import React, { useState, useEffect } from "react";

export default function MyNetwork() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [connections, setConnections] = useState([
    { id: 1, name: "J. Santos", role: "Marketing Manager", mutual: 2, status: "connected" },
    { id: 2, name: "M. Reyes", role: "Product Lead", mutual: 1, status: "connected" },
    { id: 3, name: "A. Cortez", role: "Senior Dev", mutual: 0, status: "connected" },
    { id: 4, name: "Khaled Omar", role: "Data Scientist", mutual: 0, status: "pending" },
    { id: 5, name: "S. Dela Cruz", role: "HR", mutual: 3, status: "connected" },
  ]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let list = connections.filter((d) => {
      if (filter === "mutual" && d.mutual === 0) return false;
      if (filter === "recent" && d.status !== "connected") return false;
      if (filter === "pending" && d.status !== "pending") return false;
      if (query && !(d.name.toLowerCase().includes(query) || d.role.toLowerCase().includes(query))) return false;
      return true;
    });
    setFiltered(list);
  }, [query, filter, connections]);

  const handleRemove = (id) => {
    if (confirm("Remove connection?")) {
      setConnections(connections.filter((d) => d.id !== id));
    }
  };

  const exportContacts = () => alert("Preparing export...");
  const openImport = () => alert("Open import dialog");
  const message = (id) => alert("Open chat with " + id);

  return (
    <div className="flex-1 bg-gradient-to-b from-[#061022] to-[#07111a] text-[#e6eef8]  p-4">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">

        {/* LEFT PANEL */}
        <aside className="bg-[#0b1220]/85 rounded-xl p-4 shadow-xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-teal-400 to-blue-400 flex items-center justify-center font-bold text-lg">LW</div>
            <div>
              <div className="font-bold">Leonardo Wilcon</div>
              <div className="text-sm text-gray-400">Product Designer • Manila</div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 bg-white/5 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-400">Connections</div>
              <div className="font-bold text-lg">124</div>
            </div>
            <div className="flex-1 bg-white/5 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-400">Pending</div>
              <div className="font-bold text-blue-400 text-lg">3</div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400">Manage</div>
            <div className="flex gap-2 mt-2">
              <button className="border border-white/10 text-gray-400 rounded-lg px-3 py-2 hover:bg-white/5" onClick={exportContacts}>Export</button>
              <button className="border border-white/10 text-gray-400 rounded-lg px-3 py-2 hover:bg-white/5" onClick={openImport}>Import</button>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400">Quick actions</div>
            <div className="flex flex-col gap-2 mt-2">
              <button className="border border-white/10 text-gray-400 rounded-lg px-3 py-2 hover:bg-white/5">Find Alumni</button>
              <button className="border border-white/10 text-gray-400 rounded-lg px-3 py-2 hover:bg-white/5">Manage Tags</button>
            </div>
          </div>
        </aside>

        {/* RIGHT PANEL */}
        <main className="bg-[#0b1220]/85 rounded-xl p-4 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-xl font-semibold">My Network</h2>
              <div className="text-sm text-gray-400">People you know and professional connections</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search connections"
                value={query}
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                className="px-3 py-2 rounded-lg border border-white/10 bg-transparent text-white min-w-[200px]"
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg px-3 py-2 font-semibold" onClick={() => setQuery("")}>
                Clear
              </button>
            </div>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-2 mt-3">
            {["all", "mutual", "recent", "pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  filter === f
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* CONNECTIONS LIST */}
          {filtered.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              <div className="font-semibold text-lg">No connections found</div>
              <div className="text-sm mt-2">Try changing your search or invite new contacts.</div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {filtered.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-lg">
                  <div className="w-11 h-11 rounded-md bg-gradient-to-br from-teal-400 to-blue-400 flex items-center justify-center font-bold">
                    {item.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">
                      {item.name}
                      <span className="text-sm text-gray-400 ml-1">• {item.mutual} mutual</span>
                    </div>
                    <div className="text-sm text-gray-400">{item.role}</div>
                  </div>
                  <div className="flex gap-2">
                    {item.status === "pending" ? (
                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 rounded-lg text-sm font-semibold">Accept</button>
                    ) : (
                      <button className="border border-white/10 text-gray-400 rounded-lg px-3 py-1.5 text-sm" onClick={() => message(item.id)}>
                        Message
                      </button>
                    )}
                    <button
                      className="border border-white/10 text-gray-400 rounded-lg px-3 py-1.5 text-sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
