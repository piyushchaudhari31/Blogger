import React, { useContext, useEffect, useState } from "react";
import "../UpdateBlog/updateblog.css";
import { useNavigate, useParams } from "react-router-dom";
import { blogContext } from "../../context/ContextApi";
import { useForm } from 'react-hook-form'
import axios from "axios";
import toast from 'react-hot-toast'
import Navbar from "../Navbar/Navbar";

const Updateblog = () => {
  const [preview, setPreview] = useState("https://wallpapercave.com/wp/wp9740069.jpg");
  const { blogId } = useParams();
  const { url } = useContext(blogContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()

 async function getBlogData() {
  const token = JSON.parse(localStorage.getItem("token"));
  

  try {
    const response = await axios.get(`${url}/api/blog/${blogId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined
      }
    });

    setData(response.data.blog);
    setPreview(response.data.blog.image);
  } catch (error) {
    console.log(error);
  }
}

  async function updateBlog(data) {
    try {
      const formData = new FormData();

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      
      const token = JSON.parse(localStorage.getItem("token"));

      toast.promise(
        axios.patch(`${url}/api/blog/update/${blogId}`, formData, {
          withCredentials: true,
          headers:{Authorization:token ? `Bearer ${token}` : undefined,"Content-Type":"multipart/form-data"},
        }),
        {
          loading: "Updating..",
          success: (res) => {
            
            return res.data.message;
          },
          error: (err) =>
            err?.response?.data?.message || "Something went wrong",
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }


  useEffect(() => {
    getBlogData();
  }, [data]);


  if (!data) return <h2>Loading...</h2>;

  return (
    <div>
      <Navbar />
    <div className="update-wrapper">
      <div className="left-panel">
        <img src={preview} alt="Blog Preview" />
      </div>

      <div className="right-panel">
        <div className="update-card">
          <h2>Update Blog</h2>

          <form onSubmit={handleSubmit(updateBlog)}>
            <div className="form-group">
              <label>Upload Image</label>
              <input {...register("image")} type="file" />
            </div>

            <div className="form-group">
              <label>Blog Title</label>
              <input {...register("title")} type="text" defaultValue={data.title} />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select {...register("category")} defaultValue={data.category}>
                <option value="Technology">Technology</option>
                <option value="Startup">Startup</option>
                <option value="Life-style">Life-style</option>
                <option value="Tour">Tour</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea {...register("description")} rows="8" defaultValue={data.description}></textarea>
            </div>

            <button className="update-btn">Update Blog</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Updateblog;
