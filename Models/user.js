import mongoose from "mongoose";
import { type } from "os";

let userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        photo:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
        dob:{
            type:String,
            
        },
        gender:{
            type:String,
            required:true
        },
        idproof:{
            type:String,
        
        },
        wardNumber:{
            type:String,
        
        },
        wardName:{
            type:String,
        
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        houseNumber:{
            type:String,
            
        
        },
        houseName:{
            type:String,
            
        },
        street:{
            type:String,
            
        },
        district:{
            type:String
        },
        pincode:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:String,
            
        },
        password:{
            type:String,
            required:true
        },
        usertype:{
            type:String,
            required:true
        },
        qualification:{
            type:String,

        },
        category:{
             type:String
        },
        status:{
            type:String,
            default:'pending'
        },
        currenthouse:{
            type:String
        },
        currentstreet:{
            type:String
        },
        currentpost:{
            type:String
        },
        currentpin:{
            type:String
        },
        pancard:{
            type:String
        }
    }
)
let User=mongoose.model('user',userSchema)

export default User