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
let services=mongoose.model('services',serviceschema)
export default services