import mongoose from "mongoose";
import user from './user.js'
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
        },
        userid:{
            type:mongoose.Types.ObjectId,
            ref:user
        }
    }
)
let News=mongoose.model('news',newsschema)
export default News