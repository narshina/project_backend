import mongoose from "mongoose";
import User from "./user.js";

let categoryschema=mongoose.Schema(
    {
        category:{
            type:String,
        },
        userid:{
            type:mongoose.Types.ObjectId,
            ref:User
        }
    }
)
let category=mongoose.model('category',categoryschema)
export default category