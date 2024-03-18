import mongoose from "mongoose";

let notificationschema=mongoose.Schema(
    {
       notification:{
        type:String,
        required:true
       },
       userid:{
        type:String,
        required:String
       }
    }
)
let Notification=mongoose.model('notification',notificationschema)
export default Notification