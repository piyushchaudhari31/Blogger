import React from 'react'
import logo from '../../assets/logo.png'
import '../footer/footer.css'
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";


const Footer = () => {
  return (
    <div className='Footer'>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className='intro'>
        <p>All Right Reserved . Copyright @blogger</p>
      </div>
      <div className='ShareButton'>
        <a href="https://instagram.com/mr_piyush.31" target=' '><FaInstagram  className='share'/></a>
        <a href="mailto:mrpiyushchaudhari2006@gmail.com"><MdEmail className='share'/></a>
        <a href="https://github.com/piyushchaudhari31" target=' '><FaGithub className='share'/></a>

      </div>
    </div>
  )
}

export default Footer
