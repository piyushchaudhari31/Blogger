import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from '../auth/Login/Login'
import Home from '../pages/Home/Home'
import PageNotFound from '../pages/pageNotFound/PageNotFound'
import Register from '../auth/Register/Register'
import VarifyEmailOtp from '../auth/VarifyEmailOtp/VarifyEmailOtp'
import SendOtpEmail from '../auth/sendOtpEmail/SendOtpEmail'
import Dashboard from '../components/Dashboard/Dashboard'
import CreateBlog from '../components/CretateBlog/CreateBlog'
import Updateblog from '../components/UpdateBlog/Updateblog'
import BlogDetail from '../components/BlogDetail/BlogDetail'

const Mainroutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/varify-otp' element={<VarifyEmailOtp />}></Route>
        <Route path='/sendOtp' element={<SendOtpEmail />}></Route>

        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create-post' element={<CreateBlog />}></Route>
        <Route path='/Update/:blogId' element={<Updateblog />}></Route>

        <Route path='/Blog-Detail/:id' element={<BlogDetail />}></Route>




        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </div>
  )
}

export default Mainroutes
