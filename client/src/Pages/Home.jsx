import React, { useState, useMemo } from "react";
import { PlusCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { PostModal } from "@/Components/PostModal";

export default function Home() {
  const { query, loading } = useOutletContext();
  const [openModal, setOpenModal] = useState(false); // ⬅️ modal state

  const posts = [
    {
      id: 1,
      author: "Anne Cortez",
      role: "Senior Dev • Tech · Remote",
      time: "2h",
      content:
        "Excited to share our team's latest achievements: we cut build time by 40% and launched canary releases.",
      img: "https://via.placeholder.com/1200x600/10252b/e6eef8?text=Project+Snapshot",
    },
    {
      id: 2,
      author: "Khaled Omar",
      role: "Data Scientist • FinTech",
      time: "1d",
      content:
        "On the importance of solid data contracts across teams. Agreements on schemas make rollouts smoother.",
    },
    {
      id: 3,
      author: "Leonardo Wilcon",
      role: "Product Designer • Manila",
      time: "3d",
      content: "Just finished prototyping a new collaboration dashboard for teams 🚀",
    },
  ];

  const filteredPosts = useMemo(() => {
    if (!query?.trim()) return posts;
    const lower = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.author.toLowerCase().includes(lower) ||
        p.content.toLowerCase().includes(lower) ||
        p.role.toLowerCase().includes(lower)
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-4 max-w-5xl m-auto p-4">
      {/* ✏️ CREATE POST */}
      <div
        onClick={() => setOpenModal(true)} // ⬅️ open modal on click
        className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center gap-3 shadow-[0_8px_18px_rgba(2,6,23,0.45)] cursor-pointer hover:bg-white/[0.06] transition"
      >
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-400 to-teal-400 flex items-center justify-center font-semibold">
          L
        </div>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="flex-1 bg-transparent outline-none text-[#e6eef8] placeholder-[#98a0b3] pointer-events-none"
          readOnly
        />
      </div>

      {/* 🧠 POST MODAL */}
      <PostModal openModal={openModal} setOpenModal={setOpenModal} />

      {/* 📰 FEED */}
      {loading ? (
        <div className="text-center py-10 text-[#98a0b3] animate-pulse">Searching...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-10 text-[#98a0b3]">
          No results found for "<span className="text-blue-400">{query}</span>"
        </div>
      ) : (
        <section className="flex flex-col gap-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white/[0.02] p-4 rounded-xl shadow-[0_8px_18px_rgba(2,6,23,0.45)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-400 to-blue-400 flex items-center justify-center font-semibold">
                  {post.author[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong>{post.author}</strong>
                    <span className="text-sm text-[#98a0b3]">• {post.time}</span>
                  </div>
                  <div className="text-sm text-[#98a0b3]">{post.role}</div>
                </div>
              </div>
              <div className="mt-3 text-[#dbe9ff]">
                <p>{post.content}</p>
                {post.img && (
                  <img
                    className="w-full rounded-lg mt-3 max-h-[420px] object-cover"
                    src={post.img}
                    alt="Post media"
                  />
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
