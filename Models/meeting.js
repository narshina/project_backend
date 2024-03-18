import mongoose from "mongoose";

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
            type:String,
            required:true
        }
    }
)
let President=mongoose.model('president',meetingschema)
export default President