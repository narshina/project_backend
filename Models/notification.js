import mongoose from "mongoose";
import User from "./user.js";

let notificationschema=mongoose.Schema(
    {
       notification:{
        type:String,
        required:true
       },
       userid:{
        type:mongoose.Types.ObjectId,
        ref:User
       }
    }
)
let Notification=mongoose.model('notification',notificationschema)
export default Notification