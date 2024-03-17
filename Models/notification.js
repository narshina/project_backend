import mongoose from "mongoose";

let notificationschema=mongoose.Schema(
    {
       notification:{
        type:String,
        required:true
       }
    }
)
let President=mongoose.model('president',notificationschema)
export default President