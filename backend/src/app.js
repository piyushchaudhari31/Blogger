const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const blogRoutes =  require('./routes/blog.routes')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api/auth',authRoutes)
app.use('/api/blog',blogRoutes)



module.exports = app