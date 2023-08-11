import {User} from "../model/User.js";

export const register = async(req,res) =>{
    try {
        const {name,email,password,cpassword} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(200).json({
                success:false,
                message: "User already exists",
                existingUser
            })
        }

        if(!name || !email || !password){
            return res.status(200).json({
                success:false,
                message:"please fill all the details"
            })
        }
        else if(name.trim() === "",email.trim() === "", password.trim() === ""){
            return res.status(200).json({
                success:false,
                message:"empty values are not allowed"
            })
        }
        else if(password !== cpassword){
            return res.status(200).json({
                success:false,
                message:"mismathc password"
            })
        }else{
            const user = await User.create({
                name,email,password
            })

            return res.status(201).json({
                success:true,
                message:"user created successfully"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const login =async(req,res) =>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"invalid email or password"
            })
        }
        else{
            const isMatch = await user.matchPassword(password);
            if(!isMatch || isMatch === null ){
                return res.status(500).json({
                    success:false,
                    message:"invalid email or password"
                })
            }else{
                const token = await user.generateToken();
                return res.status(200).cookie("token", token, {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set to 7 days from now
                    httpOnly: true,
                  }).json({
                    success:true,
                    message:"login success",
                    user,
                    token
                }) 
            }
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const logOut = async (req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({ success: true, message: "logout successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message, })
    }
}

export const getAllUser = async(req,res) =>{
    try {
        const user = await User.find();
        return res.status(200).json({
            success:true,
            message:"All users",
            user
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const updateProfile = async(req,res) =>{
    try {

        const user =  await User.findById(req.params.id);
        const {name,email} = req.body;
        if(name){
            user.name = name;
        }
       
        if(email){
            user.email = email;
        }
        await user.save();
        res.status(200).json({
            success: true,
            message:"profile updated",
            user
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const deleteUser = async(req,res) =>{
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const frogotPassword = async(req,res) =>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

