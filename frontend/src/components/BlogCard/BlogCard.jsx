import React, { useContext, useEffect, useState } from 'react'
import '../BlogCard/blogcard.css'
import arrow from '../../assets/arrow.png'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { blogContext } from '../../context/ContextApi'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

const BlogCard = () => {

  const [btnColor, setBtnColor] = useState('All')
  const [data, setData] = useState([])
  const { url } = useContext(blogContext)
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem("token"))

  async function getData() {
    try {
      const response = await axios.get(
        `${url}/api/blog/getAllBlog`,
        { withCredentials: true }
      )
      setData(response.data.blog)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const filterData =   btnColor === "All" ? data : data.filter(item =>item.category.toLowerCase() === btnColor.toLowerCase())

  const BlogId = (Id)=>{
    if(!token){
      toast('Login First',{
        icon:'🔐',
        style:{
          background:'#000',
          color:'#fff',
          borderRadius:'5px'
        }
      })
      return 
    }
    navigate(`/Blog-Detail/${Id}`)
  }

  return (
    <div className='blogPage'>

      <div className="blog-button">
        <button onClick={() => setBtnColor('All')}
          className={`blog-btn ${btnColor === "All" ? "active" : ""}`}>
          All
        </button>

        <button onClick={() => setBtnColor('Technology')}
          className={`blog-btn ${btnColor === "Technology" ? "active" : ""}`}>
          Technology
        </button>

        <button onClick={() => setBtnColor('Startup')}
          className={`blog-btn ${btnColor === "Startup" ? "active" : ""}`}>
          Startup
        </button>

        <button onClick={() => setBtnColor('Life-style')}
          className={`blog-btn ${btnColor === "Life-style" ? "active" : ""}`}>
          Life-Style
        </button>

        <button onClick={() => setBtnColor('Tour')}
          className={`blog-btn ${btnColor === "Tour" ? "active" : ""}`}>
          Tour
        </button>
      </div>

      <div className="blogCard">
        {filterData.map((item, idx) => (
          <div className='card' key={idx} onClick={()=>{BlogId(item._id)}}>

            <div className="blog-img">
              <img src={item.image} alt="blog" />
            </div>

            <div className="blog-category">
              <h2>{item.category}</h2>
            </div>

            <div className="blog-title">
              <h1>{item.title.slice(0, 25)}...</h1>
            </div>

            <div className="blog-description markdown">
              <ReactMarkdown>
                {item.description.slice(0, 180) + '...'}
              </ReactMarkdown>
            </div>

            <button className='Read-more'>
              <p>Read more</p>
              <img src={arrow} alt="arrow" />
            </button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default BlogCard
