import mongoose from "mongoose";

let complaintschema=mongoose.Schema(
    {
        complaint:{
            type:String,
            required:true
        },
        reply:{
            type:String,
            required:true
        },
        userid:{
            type:String,
            required:true
        }
    }
)
let complaint=mongoose.model('complaint',complaintschema)
export default complaint