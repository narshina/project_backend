import mongoose from "mongoose";
import User from "./user.js";

let complaintschema=mongoose.Schema(
    {
        complaint:{
            type:String,
            required:true
        },
        reply:{
            type:String,
        },
        userid:{
            type:mongoose.Types.ObjectId,
            ref:User
        },
        complaintTo:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now
        }
    }
)
let complaint=mongoose.model('complaint',complaintschema)
export default complaint