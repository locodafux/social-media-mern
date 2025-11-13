import { Modal, Button } from "flowbite-react";
import { useState } from "react";
import { Image, Smile, Users, X, Trash2 } from "lucide-react";

export function PostModal({ openModal, setOpenModal }) {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePost = () => {
    if (!postContent.trim() && !selectedImage) return;
    console.log("Post created:", { postContent, selectedImage });
    setPostContent("");
    setSelectedImage(null);
    setOpenModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
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
            className="text-gray-400 hover:text-gray-100 transition-colors focus:ring-0 focus:border-transparent"
          >
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          {/* User info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center font-semibold text-white shadow-md">
              L
            </div>
            <div>
              <p className="font-semibold text-[15px] leading-tight">
                Leonardo Timkang Jr.
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Users size={14} />
                <span>Friends</span>
              </div>
            </div>
          </div>

          {/* Text area */}
          <textarea
            rows={4}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-transparent text-[#e2e8f0] placeholder-gray-500 border-none focus:ring-0 resize-none outline-none text-[15px] leading-relaxed"
          />

          {/* Image Preview */}
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
                title="Remove image"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-white/10 my-4" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-gray-400">
              {/* Image Upload */}
              <label
                htmlFor="image-upload"
                className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1"
                title="Add image"
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

              <button
                type="button"
                className="hover:text-yellow-400 transition-colors"
                title="Add emoji"
              >
                <Smile size={20} />
              </button>
            </div>

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
