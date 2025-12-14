import React, { useContext } from "react";
import "./register.css";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { blogContext } from "../../context/ContextApi";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {

  const { register, handleSubmit, reset } = useForm();
  const { url } = useContext(blogContext);

  const navigate = useNavigate();

  const submitHandler = async (data) => {

    const finalData = {
      ...data,
      fullName: `${data.firstName} ${data.lastName}`,
      gender: data.gender   // ⬅ added gender here
    };

    try {
      toast.promise(
        axios.post(`${url}/api/auth/register`, finalData, { withCredentials: true }),
        {
          loading: "Creating User..",
          success: (res) => res.data.message || "User Created Successfully",
          error: (err) => err.response.data.message || "Something went wrong"
        }
      )
        .then(() => navigate('/login'))
        .catch((err) => toast.error(err.message));

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit(submitHandler)}>

        <h2>Join Our Blogging Community</h2>
        <p className="subtitle">Create your account and start sharing your stories with the world.</p>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input type="text" {...register("firstName")} className="input-field" placeholder="First Name" required />
        </div>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input type="text" {...register("lastName")} className="input-field" placeholder="Last Name" required />
        </div>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input type="email" {...register("email")} className="input-field" placeholder="Email Address" required />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input type="Password" {...register("password")} className="input-field" placeholder="Password" required />
        </div>

        {/* ✔ NEW — Gender Radio Section */}
        <div className="gender-row">
          <label className="gender-label">Gender:</label>

          <div className="gender-options">
            <label>
              <input type="radio" value="male" {...register("male")} required />
              Male
            </label>

            <label>
              <input type="radio" value="female" {...register("female")} />
              Female
            </label>
          </div>
        </div>

        <div className="checkbox-row">
          <input type="checkbox" id="confirmEmail" required />
          <label htmlFor="confirmEmail">My Email ID is valid</label>
        </div>

        <button className="register-btn" type="submit">
          Register
        </button>

        <p className="login-text">
          Already have an account?{" "}
          <Link className="Link-section" to="/login">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Register;
