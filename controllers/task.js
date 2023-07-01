import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export async function newTask (req,res,next){
    try {
      const {title,description }=req.body; 
    await Task.create({title,description,user:req.user});
     res.status(201).json({
        success:true,
        message:"Task created"
     })
    } catch (error) {
      next(error)
    }
}

export async function getTasks (req,res,next){
   try {
      const userId=req.user._id;
   const tasks=await Task.find({user:userId})
    res.status(201).json({
       success:true,
       tasks,
    })
   } catch (error) {
      next(error)
   }
}

export async function updateTask (req,res,next){
   try {
      const {id}=req.params;
   const task =await Task.findById(id);
    if(!task)return next(new ErrorHandler("Task id invalid could not be updated",404))

task.isCompleted=!task.isCompleted;
 await task.save();
    res.status(201).json({
       success:true,
       message:"task updated"
    })
   } catch (error) {
      next(error)
   }
}

export async function deleteTask (req,res,next){
   try {
      const {id}=req.params;
   const task =await Task.findById(id);
   if(!task)return next(new ErrorHandler("Task id invalid task could not be deleted",404))
   await Task.deleteOne({_id:id})

    res.status(201).json({
       success:true,
       message:"task deleted"
    })
   } catch (error) {
      next(error)
   }
}