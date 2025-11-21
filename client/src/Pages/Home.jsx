import React, { useState, useMemo, useEffect, useContext } from "react";
import { PlusCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { PostModal } from "@/Components/PostModal";
import {AppContext} from "@/Context/AppContext";

export default function Home() {
  const { query, loading } = useOutletContext();
  const [openModal, setOpenModal] = useState(false); 
  const [data, setData] = useState([]);
  const { token } = useContext(AppContext);
  const getData = async () => {
    const url = "api/posts";
	  try {
      const res = await fetch(url,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const data = await res.json()
    setData(data);
    console.log(data)
	  } catch (error){
	      console.log("Error fetching data:", error);
	  }
  }

  useEffect(() => {
    getData();
  }, []);

   const posts = useMemo(
    () =>
      data.map((p) => ({
        id: p._id,
        author: p.owner?.name || "Unknown User",
        role: p.owner?.role || "Member",
        time: new Date(p.createdAt).toLocaleDateString(),
        content: p.content,
        img: p.imageUrl,
      })),
    [data]
  );

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!query?.trim()) return posts;
    const lower = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.author?.toLowerCase().includes(lower) ||
        p.content?.toLowerCase().includes(lower) ||
        p.role?.toLowerCase().includes(lower)
    );
  }, [query, posts]);
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
          className="flex-1 bg-transparent outline-none text-[#e6eef8] placeholder-[#98a0b3] pointer-events-none border-none focus:ring-0 focus:border-transparent"
          readOnly
        />
      </div>

      {/* 🧠 POST MODAL */}
      <PostModal openModal={openModal} setOpenModal={setOpenModal} onPostCreated ={getData} />

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
