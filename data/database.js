import mongoose from "mongoose"; 

export default function connectDb(){mongoose.connect(process.env.MONGO_URI,{
    dbName:"backend_api",
}).then(c=>{
    console.log("database connected")
}).catch((e)=>{
    console.log(e);
})
}