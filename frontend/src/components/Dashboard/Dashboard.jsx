import React, { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import { blogContext } from "../../context/ContextApi";
import axios from "axios";
import moment from "moment";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, url } = useContext(blogContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getUserBlog = async () => {
    try {
      const res = await axios.get(`${url}/api/blog/user/${user.id}`,{ withCredentials: true });
      setData(res.data.blog);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getUserBlog();
    }
  }, [user]); 

  const updateBlog = (id) => {
    navigate(`/Update/${id}`);
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${url}/api/blog/${id}`, {withCredentials: true,});
      toast.success("Deleted Successfully");
      setData(prev => prev.filter(blog => blog._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="main-area">

          <div className="topbar">
            <h2>Dashboard Overview</h2>
            <p>Manage your blogs and activity</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>{data.length}</h3>
              <p>Total Blogs</p>
            </div>
          </div>

          <div className="table-box">
            <div className="table-title">
              <h3>Recent Blogs</h3>
            </div>

            {user && (
              <div className="Table-format">

                <div className="table-header">
                  <p>Image</p>
                  <p>Title</p>
                  <p>Category</p>
                  <p>Updated At</p>
                  <p>Action</p>
                </div>

                {data.map((item) => (
                  <div className="table-row" key={item._id}>
                    <img src={item.image} alt="blog" />
                    <p>
                      {item.title.slice(0, 45)}
                      <span style={{ opacity: 0.6 }}>...</span>
                    </p>
                    <p className="Category">{item.category}</p>
                    <p>{moment(item.updatedAt).format("MMM DD, YYYY")}</p>

                    <div className="modification-btn">
                      <button
                        className="create"
                        onClick={() => updateBlog(item._id)}
                      >
                        Update
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteBlog(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;
