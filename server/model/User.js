import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    return next();
})


userSchema.methods.matchPassword =async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = async function (){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}

export const User = mongoose.model("User",userSchema);