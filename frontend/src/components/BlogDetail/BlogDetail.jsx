import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { blogContext } from "../../context/ContextApi"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import ReactMarkdown from "react-markdown"
import "../BlogDetail/blogdetail.css"


const BlogDetail = () => {
  const { url } = useContext(blogContext)
  const { id } = useParams()
  const token = JSON.parse(localStorage.getItem("token"))
  const [data, setData] = useState(null)

  useEffect(() => {
    axios
      .get(`${url}/api/blog/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined
        }
      })
      .then(res => setData(res.data))
      .catch(err => console.log(err.message))
  }, [])

 
  

  return (
    <div>
      <Navbar />

      
      <div className="BLogDetail">
        <div className="Blog-info">
          <div className="blog-title">
            <h1>{data?.blog?.title}</h1>
          </div>

          <div className="blog-profilePic">
            <img src={data?.user.profilePic} alt="" />
            <p>{data?.user?.fullName}</p>
          </div>

          <div className="Blog-Image">
            <img src={data?.blog?.image} alt="" />
          </div>

          <div className="blog-description">
            <div className="markdown">
              <ReactMarkdown>
                {data?.blog?.description}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default BlogDetail
