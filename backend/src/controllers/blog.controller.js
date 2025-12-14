const authModel = require("../models/auth.model");
const blogModel = require("../models/blog.model");
const main = require("../service/Ai.service");
const uploadImage = require("../service/Storage.service");
const {v4:uuidv4} =require('uuid')



async function CreteBlog(req,res){

    const {title,description,image ,category} = req.body
    const UserId = req.user._id

    const uploadFile = await uploadImage(req.file.buffer,`${uuidv4()}`)
  

    const blog = await blogModel.create({
        title,
        description,
        UserId,
        category,
        image:uploadFile.url
    })

    res.status(200).json({
        message:"Blog Created Successfully",
        blog
    })

}

async function getAllBlog(req,res){

    const blog = await blogModel.find()

    res.status(200).json({
        message:"Fatch Successfully",
        blog
    })

}

async function getBlogByUserid(req,res){

    const {id} = req.params
    
    const user = await authModel.findById(id)
    const blog = await blogModel.find({UserId:user._id})

    res.status(200).json({
        message:"Fatch successfully",
        blog
    })
    

}

async function getBlogById(req,res){
    const{id} = req.params
    
       
    const blog = await blogModel.findById(id).populate("UserId","fullName email profilePic")
    
    if(!blog){
        return res.status(400).json({
            message:"Blog Not Found"
        })
    }
    res.status(200).json({
        message:"Fetch successfully",
        blog,
        user:blog.UserId
    }
    )
}

async function DeleteBlog(req,res){

    const {id} = req.params

    const blog = await blogModel.findByIdAndDelete({_id:id})

    res.status(200).json({
        message:"Delete Successfully"
    })

    
}
async function updateBlog(req,res){
    const {blogId}= req.params 
    const {title , description , category} = req.body
    const UserId = req.user._id
    

    const update = {}

    if(title) update.title = title
    if(description) update.description= description
    if(category) update.category = category

    if(req.file){
        const uploadFile = await uploadImage(req.file.buffer,`${uuidv4()}`)
        update.image = uploadFile.url
    }

    const BlogUpdate = await blogModel.findByIdAndUpdate(
        blogId,
        update,
        { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Blog updated successfully",
      blog: BlogUpdate,
    });
}



async function GenerateWithAI(req,res){

    const {title} = req.body

    if(!title){
        res.status(400).json({
            message:"Title is Required"
        })
    }

    const aiText = await main(title)

    res.status(200).json({
        description:aiText
    })
}

module.exports = {CreteBlog , getAllBlog , getBlogByUserid , getBlogById ,DeleteBlog,updateBlog ,GenerateWithAI}