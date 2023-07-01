import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";

export async function register(req,res,next){
     try {
        const {name,email,password}=req.body; 

     let user=await User.findOne({email});
     let hashedPassword=await bcrypt.hash(password,10);
     if(user)return next(new ErrorHandler("User already exists",404))

 user=await User.create({name,email,password:hashedPassword})
sendCookie(user,res,"User Registered successfully",201 ); 
     } catch (error) {
        next(error)
     }
 }

 export function definite(req,res){
 res.status(200).json({
    success:true,
    user:req.user,
 })
   }
 
   export  async function login(req,res,next){
try {
    const {email,password}=req.body

    const user=await User.findOne({email}).select("+password");
  
    if(!user) return next(new ErrorHandler("Invalid email or Password",404))
  
     const isMatch= await bcrypt.compare(password,user.password)
  
     if(!isMatch)return next(new ErrorHandler("Invalid email or Password",404))
  
   sendCookie(user,res,`Welcome Back ${user.name}`,200)
} catch (error) {
    next(error)
}
} 

export function logout(req,res){
   
    res.status(200).cookie("token",null,{
      expires:new Date(Date.now()),
      sameSite:process.env.NODE_DEV==="Development" ? "lax": "none",
         secure:process.env.NODE_DEV==="Development" ? false: true,
   }).json({
       success:true,
       user:req.user,
    })
      }