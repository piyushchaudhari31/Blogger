  import React, { useContext } from "react";
  import "./login.css";
  import { FaEnvelope, FaLock } from "react-icons/fa";
  import { Link, useNavigate } from "react-router-dom";
  import {useForm} from 'react-hook-form'
  import { blogContext } from "../../context/ContextApi";
  import axios from 'axios'
  import toast from 'react-hot-toast'

  const Login = () => {

    const {register , handleSubmit , reset} = useForm()
    const {url,setUser , setIsEmailVaify} = useContext(blogContext)
    
    const navigate = useNavigate()


    const submitHandler = async(data)=>{
      try {

        toast.promise(
          axios.post(`${url}/api/auth/login`,data,{withCredentials:true}),
          {
            loading:"Loading..",
            success:(res)=>res.data.message || "Login Successfully",
            error:(err)=>err.response.data.message || "Something went wrong"
          }
        ).then((res)=>{
          navigate('/')
          localStorage.setItem("user",JSON.stringify(res.data.user))
          localStorage.setItem("token",JSON.stringify(res.data.token))
          setUser(res.data.user)
          setIsEmailVaify(res.data.user.isEmailVarify)
        
          
          
        }).catch((err)=>console.log("err0r ===",err.message))
        
      } catch (error) {
        if(error.response){
          console.log(error.response.data.message);
          
        }
        
      }

      
      
    }



    return (
      <div className="login-container">
        <form className="login-card" onSubmit={handleSubmit(submitHandler)}>
          <h2>Welcome Back, Blogger!</h2>
          <p className="subtitle">Sign in to continue writing and exploring stories.</p>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" {...register("email")} className="input-field" placeholder="Email" required/>
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input type="Password" {...register("password")} className="input-field" placeholder="******" required />
          </div>

          <button className="login-btn" type="submit">Login</button>

          <p className="signup-text">Don’t have an account?{" "} <Link className="Link-section" to={"/register"}> Sign Up </Link>
          </p>
        </form>
      </div>
    );
  };

  export default Login;
