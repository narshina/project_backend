import mongoose from "mongoose";

let serviceschema=mongoose.Schema(
    {
        service:{
            type:String,
            required:true
        },
        processingTime:{
            type:String,
            required:true
        },
        requirement:{
            type:String,
            required:true
        },
        fees:{
            type:String,
            required:true
        }
    }
)
let Staff=mongoose.model('staff',serviceschema)
export default Staff