import mongoose from "mongoose";
import User from "./user.js";

let wardschema=mongoose.Schema(
    {
        wardnumber:{
            type:String,
            required:true
        },
        wardname:{
            type:String,
            required:true
        },
        lgd:{
            type:String,
            required:true
        },
        userid:{
            type:mongoose.Types.ObjectId,
            ref:User
        }
    }
)
let ward=mongoose.model('ward',wardschema)
export default ward