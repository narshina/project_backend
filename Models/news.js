import mongoose from "mongoose";

let newsschema=mongoose.Schema(
    {
        news:{
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
        }
    }
)
let President=mongoose.model('president',newsschema)
export default President