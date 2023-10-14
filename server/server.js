import express from "express";
import mongoose from "mongoose";
import cookie from "cookie-parser"
import { config } from "dotenv";
import cloudinary from "cloudinary";

// importing routes
import userRouter from "./routes/User.js"
import blogRouter from "./routes/Blogs.js"

const app = express();
config({path:"./config/config.env"})
const port = process.env.PORT

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cookie());

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_KEY_SECRET,
    url:process.env.CLOUD_URL,
})

// database connection

const mongoDB = async() =>{
   try {
    await mongoose.connect(process.env.MONGODB,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    console.log("db connected")
   } catch (error) {
    console.log(error.message,"db not connected")
    
   }
}
mongoDB();
// routes here

app.use("/api/v1",userRouter)
app.use("/api/v1",blogRouter)



app.use("/",()=>{
    console.log("working")
});

app.listen(port,()=>{
    console.log( `listening on  ${port}`)
})