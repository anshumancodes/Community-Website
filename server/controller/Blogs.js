import { Blogs } from "../model/Blogs.js";
import cloudinary from "cloudinary"


export const getAllBlogs = async(req,res) =>{
    try {
        const blogs = await Blogs.find();
        return res.status(200).json({
            success: true,
            message: "all blogs",
            blogs:blogs.reverse()
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const createBlogs = async(req,res) =>{
    try {
        const {image,title,description} = req.body;

        const myCloud = await cloudinary.v2.uploader.upload(image,{
            folder:"images",
            resource_type: "auto",
        })

        const blog = await Blogs.create({
            image:{ public_id: myCloud.public_id, url: myCloud.secure_url },
            title,description
        })

        return res.status(200).json({
            success: true,
            message: "blogs created",
            blog
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const updateBlogs = async(req,res) =>{
   try {
      const  blog = await Blogs.findById(req.params.id);
      if(!blog){
        return res.status(404).json({
            success: false,
            message: 'Blog not found',
        })
      }

      const {image,title,description} = req.body;
      if(image){
        await cloudinary.v2.uploader.destroy(products.image.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(image,{
          folder:"images"
      })
      blog.image.public_id = myCloud.public_id;
      blog.image.url = myCloud.secure_url;
      }

      if(title){
        blog.title = title;
      }
      if(description){
        blog.description = description;
      }

      await blog.save(req, res);

      return res.status(200).json({
        success: true,
        message:"Blogs updated successfully",
        blog
      })
   } catch (error) {
    return res.status(500).json({
        message: error.message
    })
   }
}


export const deleteBlogs = async(req,res) =>{
    try {
        await cloudinary.v2.uploader.destroy(products.image.public_id);
        await Blogs.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Blogs deleted successfully',
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}