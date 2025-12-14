import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import arrow from '../../assets/arrow.png';
import '../Navbar/navbar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
import { blogContext } from '../../context/ContextApi';

const Navbar = () => {

  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
 
  const {url , isEmailVarify ,user , setUser} = useContext(blogContext)
  
  
  


  
  const handleLogout =async() => {
    toast.promise(
    axios.post(`${url}/api/auth/logOut`,{},{withCredentials:true}),
    {
      loading:"Loading..",
      success:(res)=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
        navigate('/')
        return res.data.message
      },
      error:(err)=>err.response.data.message || "Something Went Wrong"
    }
    )    
  };
  
  

  
  

  return (
    <div className='navbar'>
      
      <div className="title">
        <img src={logo} alt="logo" onClick={()=>{
          navigate('/')
          window.scrollTo(0,0)
          }}/>
      </div>

      {!user ? (
        <div className="navbar-button" onClick={() => navigate('/login')}>
          <button>Get started</button>
          <img src={arrow} alt="arrow" />
        </div>
      ) : (
        <div className="profile-section">
  <img 
    src={user?.profilePic || "https://i.pravatar.cc/40"}  
    className="profile-img" 
    onClick={() => setOpenMenu(!openMenu)}
  />

  {openMenu && (
    <div className="dropdown-menu new-menu">
      {!isEmailVarify && (
        <p onClick={() => navigate('/sendOtp')}>Verify Email</p>
      )}

      <p onClick={() => navigate('/dashboard')}>Dashboard</p>
      <p onClick={() => navigate('/create-post')}>Create Blog</p>

      <p onClick={handleLogout} className="logout">
        Logout
      </p>
    </div>
  )}
</div>

      )}

    </div>
  );
};

export default Navbar;
