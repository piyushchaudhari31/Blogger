import React, { useContext } from "react";
import "./sendotpemail.css";
import { FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { blogContext } from "../../context/ContextApi";
import {useNavigate} from 'react-router-dom'

const SendOtpEmail = () => {
  const { register, handleSubmit } = useForm();
  const {url} = useContext(blogContext)
  const navigate = useNavigate()

  const submitHandler = async (data) => {

    try {
      const token = JSON.parse(localStorage.getItem("token"))
      toast.promise(
        axios.post(`${url}/api/auth/sendEmail-OTP`,data,{withCredentials:true,headers:{Authorization:token ? `Bearer ${token}` : undefined}}),
        {
          loading: "Sending verification email...",
          success: (res) =>{
            navigate('/varify-otp')
            
            return res.data.message || "Email sent successfully!"},
          error: (err) => err.response.data.message || "Something went wrong",
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  

  return (
    <div className="verify-container">
      <form className="verify-card" onSubmit={handleSubmit(submitHandler)}>
        <h2>Email Verification</h2>
        <p className="subtitle">
          Enter your email to receive the OTP.
        </p>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            {...register("email")}
            className="input-field"
            placeholder="Email"
            required
          />
        </div>

        <button className="verify-btn" type="submit">
          send Otp
        </button>
        
        
      </form>
    </div>
  );
};

export default SendOtpEmail;