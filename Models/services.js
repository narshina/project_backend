import mongoose from "mongoose";
import User from "./user.js";

let serviceschema=mongoose.Schema(
    {
        service:{
            type:String,
            required:true
        },
        processingTime:{
            type:String,
            required:true
        },
        requirement:{
            type:String,
            required:true
        },
        userid:{
            type:mongoose.Types.ObjectId,
            ref:User
        },
    }
)
let services=mongoose.model('services',serviceschema)
export default services