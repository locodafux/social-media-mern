import { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      user: "Anne Cortez",
      message: "commented on your post “New UI Concepts for Dashboard”.",
      time: "2m ago",
    },
    {
      id: 2,
      user: "Khaled Omar",
      message: "liked your photo update.",
      time: "10m ago",
    },
    {
      id: 3,
      user: "M. Reyes",
      message: "mentioned you in a comment: “Great work on this project!”",
      time: "1h ago",
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-gradient-to-b from-[#061022] to-[#07111a] text-[#e6eef8] p-4">
    

      {/* Notifications List */}
      <main className="w-full max-w-2xl mt-10 flex flex-col gap-4 px-5">
        {notifications.length === 0 ? (
          <div className="text-center text-[#98a0b3] mt-20 text-lg">
            You're all caught up! 🎉
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-4 bg-[#0b1220] p-5 rounded-xl border border-white/10 hover:bg-white/5 transition"
            >
              <div className="w-[45px] h-[45px] flex items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-blue-500 font-bold text-lg">
                {n.user.charAt(0)}
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-base">{n.user}</h4>
                <p className="text-sm text-[#98a0b3] mt-1 leading-relaxed">
                  {n.message}
                </p>
                <div className="text-xs text-[#98a0b3] mt-2">{n.time}</div>
              </div>

              <button
                onClick={() => markAsRead(n.id)}
                className="bg-blue-500 hover:opacity-80 text-white font-semibold px-3 py-1.5 rounded-md text-sm transition"
              >
                Mark as read
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
