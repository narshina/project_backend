import mongoose from "mongoose";
import User from "./user.js";

let meetingschema=mongoose.Schema(
    {
        agenda:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
        venue:{
            type:String,
            required:true
        },
        userid:{
            type:mongoose.Types.ObjectId,
            ref:User
        }
        
    }
)
let meeting=mongoose.model('meeting',meetingschema)
export default meeting