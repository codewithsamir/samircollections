import mongoose, {  Schema } from "mongoose";

const userSchema =new Schema({
    username:{
    type:String,
    required:[true,"please provide a username"],
    unique:true

},
email:{
    type:String,
    required:[true,"please provide an email"],
    unique:true
    },
password:{
        type:String,
        required:[true,"please provide a password"],
        minlength:8
        },
role:{
        type:String,
        enum:["user","admin"],
        default:"user"
        },
isVerified:{
            type:Boolean,
            default:false,
        },
isAdmin:{
            type:Boolean,
            default:false
            },

forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,

    
})

 const CustomerUser =  mongoose.models.customerusers || mongoose.model("CustomerUser", userSchema)

 export default CustomerUser;