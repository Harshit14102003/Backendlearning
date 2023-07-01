import jwt from "jsonwebtoken"
import { User } from "../models/user.js ";
export async function isAuthenticated(req,res,next){
    const {token}=req.cookies;
    if(!token){
        return res.status(404).json({
            success:false,
            message:"Login first",
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET); 
    const {_id}=decoded;
    req.user=await User.findById(_id);
    next();
}