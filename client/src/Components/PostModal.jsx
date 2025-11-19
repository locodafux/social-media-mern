  import { Modal, Button } from "flowbite-react";
  import { useState, useContext } from "react";
  import { Image, Smile, Users, X, Trash2 } from "lucide-react";
  import { AppContext } from "@/Context/AppContext"; // ✅ adjust this path if needed

  export function PostModal({ openModal, setOpenModal }) {
    const { token, user } = useContext(AppContext); // ✅ get user + token globally
    const [postContent, setPostContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    // Handle image upload
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedImage(URL.createObjectURL(file)); // preview
        setSelectedImageFile(file); // actual file
      }
    };

    const handleRemoveImage = () => {
      setSelectedImage(null);
      setSelectedImageFile(null);
    };

    // Submit post
    const handlePost = async () => {
      if (!postContent.trim() && !selectedImageFile) return;

      const formData = new FormData();
      formData.append("content", postContent);

      if (selectedImageFile) {
        formData.append("image", selectedImageFile);
      }

      try {
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // 🔑 send token
          },
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Post failed:", data);
          return;
        }

        console.log("Post created:", data);

        // Reset modal fields
        setPostContent("");
        setSelectedImage(null);
        setSelectedImageFile(null);
        setOpenModal(false);
      } catch (err) {
        console.error("Error posting:", err);
      }
    };

    return (
      <Modal
        show={openModal}
        size="lg"
        onClose={() => setOpenModal(false)}
        popup
        theme={{
          root: {
            base: "fixed inset-0 z-50 overflow-y-auto overflow-x-hidden",
            show: {
              on: "bg-gray-900/50 backdrop-blur-md dark:bg-gray-900/80",
              off: "hidden",
            },
          },
          content: {
            base: "relative h-full w-full p-4 md:h-auto",
            inner:
              "relative flex h-full flex-col rounded-2xl bg-[#0f172a] shadow-2xl border border-white/10 overflow-hidden outline-none dark:bg-gray-800",
          },
          body: {
            base: "p-0 flex-1 overflow-auto",
          },
        }}
      >
        <div className="text-[#e2e8f0]">
          {/* HEADER */}
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-semibold text-lg tracking-wide">Create Post</h3>
            <button
              onClick={() => setOpenModal(false)}
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6">
            {/* USER INFO */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center font-semibold text-white shadow-md">
                {user?.name?.charAt(0) || "?"}
              </div>
              <div>
                <p className="font-semibold text-[15px] leading-tight">
                  {user?.name}
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Users size={14} />
                  <span>Friends</span>
                </div>
              </div>
            </div>

            {/* TEXT AREA */}
            <textarea
              rows={4}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder={`What's on your mind, ${user?.name?.split(" ")[0]}?`}
              className="w-full bg-transparent text-[#e2e8f0] placeholder-gray-500 border-none focus:ring-0 resize-none outline-none text-[15px] leading-relaxed"
            />

            {/* IMAGE PREVIEW */}
            {selectedImage && (
              <div className="relative mt-4 rounded-xl overflow-hidden border border-white/10">
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}

            {/* DIVIDER */}
            <div className="border-t border-white/10 my-4" />

            {/* FOOTER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-gray-400">
                {/* Image Upload */}
                <label
                  htmlFor="image-upload"
                  className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Image size={20} />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                {/* Emoji button */}
                <button
                  type="button"
                  className="hover:text-yellow-400 transition-colors"
                >
                  <Smile size={20} />
                </button>
              </div>

              {/* POST BUTTON */}
              <Button
                onClick={handlePost}
                disabled={!postContent.trim() && !selectedImage}
                className={`font-semibold px-5 py-2 rounded-lg transition-all ${
                  postContent.trim() || selectedImage
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
