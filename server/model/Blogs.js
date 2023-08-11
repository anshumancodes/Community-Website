import mongoose from 'mongoose';

const blogsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    image:{
        public_id:String,
        url:String
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
})

export const Blogs = new mongoose.model("Blog",blogsSchema);