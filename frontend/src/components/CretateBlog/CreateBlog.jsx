import React, { useContext, useState } from "react";
import "../CretateBlog/createblog.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { blogContext } from "../../context/ContextApi";
import toast from "react-hot-toast";
import Navbar from "../Navbar/Navbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const { url } = useContext(blogContext);
  const navigate = useNavigate()

  const [description, setDescription] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm();

  const submitHandler = async (data) => {
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", description);

    const token = JSON.parse(localStorage.getItem("token"));

    toast.promise(
      axios.post(`${url}/api/blog/create`, formData, {
        withCredentials: true,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }),
      {
        loading: "Uploading...",
        success: (res) => {
          reset();
          setDescription("");
          navigate('/')
          return res.data.message;
        },
        error: (err) =>
          err?.response?.data?.message || "Blog upload failed",
      }
    );
  };

  const generateWithAI = async () => {
    const title = watch("title");

    if (!title) {
      toast.error("Enter Title");
      return;
    }

    try {
      setAiLoading(true);
      const res = await axios.post(`${url}/api/blog/ai-description`, {
        title,
      });
      setDescription(res.data.description);
    } catch (error) {
      console.log(error.message);
      toast.error("AI generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="createBlogPage">
        <div className="create-container">
          <h2>Create New Blog</h2>

          <form onSubmit={handleSubmit(submitHandler)}>
            {/* Image */}
            <div className="form-group">
              <label>Upload Image</label>
              <input
                {...register("image")}
                type="file"
                accept="image/*"
              />
              
            </div>

            {/* Title */}
            <div className="form-group">
              <label>Blog Title</label>
              <input
                {...register("title")}
                type="text"
                placeholder="Enter blog title..."
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category</label>
              <select {...register("category")}>
                <option>Technology</option>
                <option>Startup</option>
                <option>Life-style</option>
                <option>Tour</option>
              </select>
            </div>

            {/* Description */}
            <div className="form-group">
              

              <button
                type="button"
                className="ai-btn"
                onClick={generateWithAI}
                disabled={aiLoading}
              >
                {aiLoading ? "Generating..." : "Generate with AI 🤖"}
              </button>
              

              {/* Markdown Editor */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your blog using Markdown..."
                rows="10"
              />

              
              
            </div>

            <button className="create-btn">Create Blog</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
