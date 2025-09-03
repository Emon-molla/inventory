import { generateJwtToken } from "../lib/generateJwtToken.js";
import { isValidBDPhone } from "../lib/phoneNumberChecker.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"

export const register = async (req,res) =>{
    const {name,email,phone,password, role} = req.body;

    try {
        if(!name || !email || !password || !phone || !role){
            return res.status(400).json({message:"All fields are required."})
        }

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({message:"User already exist."})
        };

        if(password.length < 6){
            return res.status(400).json({message:"Password must be 6 words."})
        }
        const hashPassword = await bcrypt.hash(password,10);

        if(!isValidBDPhone(phone)){
            return res.status(400).json({message:"Please enter a valid number."})
        }

        const newUser = new User({
            name,
            email,
            password:hashPassword,
            phone,
            role
        })

        await newUser.save()
        generateJwtToken(res,newUser._id,newUser.role)

        return res.status(200).json({
            success:true,
            user:{...newUser._doc,password:undefined}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error."})
    }
}

export const login  = async (req,res) =>{
    const {email,password} = req.body

    try {
       if(!email || !password) {
        return res.status(400).json({message:"All fields are required."})
       }

       const user = await User.findOne({email})

       if(!user){
        return res.status(400).json({message:"Invalid user or password."})
       }

       const ispasswordValid = await bcrypt.compare(password,user.password)
       
       if(!ispasswordValid){
        return res.status(400).json({message:"Invalid user or password"})
       }

       generateJwtToken(res,user._id,user.role)

       res.status(200).json({message:"User login successfully."})
    } catch (error) {
       return res.status(500).json({message:"Internal server error."})
    }
}

export const logout = async (req,res) =>{
    res.clearCookie('token');
    res.status(200).json({message:"Logout successfully."})
}

export const checkMe = async(req,res) =>{
    try {
        const user = await User.findById(req.userId)

        if(!user){
            return res.status(400).json({message:"User not found."})
        }

        res.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password:undefined
            }
        })
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
}