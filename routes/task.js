import express from "express";
import { newTask,getTasks, updateTask, deleteTask } from "../controllers/task.js";
import {isAuthenticated} from "../middlewares/auth.js"
const router=express.Router(); 

router.post("/new",isAuthenticated,newTask )
router.get("/my",isAuthenticated,getTasks )

//dynamic route at last
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default router;  