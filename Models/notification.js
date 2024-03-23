import mongoose from "mongoose";
import User from "./user.js";
import { time } from "console";

let notificationschema=mongoose.Schema(
    {
       notification:{
        type:String,
        required:true
       },
       userid:{
        type:mongoose.Types.ObjectId,
        ref:User
       },
       date:{
        type:Date,
        default:Date.now
       }
    }
)
let Notification=mongoose.model('notification',notificationschema)
export default Notification