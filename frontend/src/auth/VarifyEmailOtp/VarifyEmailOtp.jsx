import React, { useContext, useEffect, useState } from "react";
import "./varifyotp.css";
import { FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { blogContext } from "../../context/ContextApi";
import { useNavigate } from "react-router-dom";

const VarifyEmailOtp = () => {
  const { register, handleSubmit } = useForm();
  const { url, setIsEmailVaify, setUser } = useContext(blogContext);
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(120); 
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const submitHandler = async (data) => {
    try {
      toast.promise(
        axios.post(`${url}/api/auth/varify-otp`, data, {
          withCredentials: true,
        }),
        {
          loading: "Verifying OTP...",
          success: (res) => {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
            setIsEmailVaify(true);
            navigate("/");
            return res.data.message || "OTP verified successfully!";
          },
          error: (err) =>
            err.response?.data?.message || "Invalid OTP",
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const resendOtp = async () => {
    try {

      const token = JSON.parse(localStorage.getItem("token"))

      toast.promise(axios.post(`${url}/api/auth/resend-otp`,{},{ withCredentials: true ,headers:{Authorization:token?`Bearer ${token}` : undefined}}),
        {
          loading: "Sending OTP...",
          success: (res) => {
            setTimeLeft(120);    
            setCanResend(false);
            return res.data.message || "OTP resent successfully!";
          },
          error: (err) =>
            err.response?.data?.message || "Something went wrong",
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="verify-container">
      <form className="verify-card" onSubmit={handleSubmit(submitHandler)}>
        <h2>OTP Verification</h2>
        <p className="subtitle">
          Enter your OTP received on email.
        </p>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="text"
            {...register("otp")}
            className="input-field"
            placeholder="OTP"
            required
          />
        </div>

        <button className="verify-btn" type="submit">
          Verify Email
        </button>

        {canResend ? (
          <p className="resend-otp active" onClick={resendOtp}>
            Resend OTP
          </p>
        ) : (
          <p className="resend-otp disabled">
            Resend OTP in {formatTime(timeLeft)}
          </p>
        )}

        <p className="spam-text">
          🙋‍♂️ If you don’t receive the email, please check your{" "}
          <strong>Spam</strong> folder.
        </p>
      </form>
    </div>
  );
};

export default VarifyEmailOtp;
