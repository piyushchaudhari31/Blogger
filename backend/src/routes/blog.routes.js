const express = require('express')
const { authMiddlewareUser } = require('../middleware/auth.middleware')
const { CreteBlog, getAllBlog, getBlogByUserid, getBlogById, DeleteBlog, updateBlog, GenerateWithAI } = require('../controllers/blog.controller')
const multer = require('multer')

const router = express.Router()

const upload = multer({storage:multer.memoryStorage()})

router.post('/create',authMiddlewareUser,upload.single("image"),CreteBlog)
router.get('/getAllBlog',getAllBlog)

router.get('/user/:id',getBlogByUserid)
router.get('/:id',authMiddlewareUser,getBlogById)

router.delete('/:id',DeleteBlog)
router.patch('/update/:blogId',authMiddlewareUser,upload.single("image"),updateBlog)

router.post('/ai-description',GenerateWithAI)

module.exports = router