import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import '../Home/home.css'
import TitlePage from '../../components/TitlePage/TitlePage'
import BlogCard from '../../components/BlogCard/BlogCard'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div className='home-page'>
      <Navbar />
      <div className='home'>
        
        <TitlePage />
        <BlogCard />

      </div>
      <Footer />

    </div>

  )
}

export default Home
