import mongoose from "mongoose";
import services from "./services.js";

let fieldschema=mongoose.Schema(
    {
        servicesid:{
            type:mongoose.Types.ObjectId,
            ref:services
        },
        fieldEnglish:{
            type:String,
            required:true
        },
        fieldMalayalam:{
            type:String,
        
        }

        
    }
    
)
let fields=mongoose.model('fields',fieldschema)
export default fields