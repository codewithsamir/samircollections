import mongoose, {  Schema } from "mongoose";

const userSchema =new Schema({
    username:{
    type:String,
    required:[true,"please provide a username"],
    

},
email:{
    type:String,
    required:[true,"please provide an email"],
    unique:true
    },
password:{
        type:String,
        required:[true,"please provide a password"],
        minlength:6
        },
address:{
    type:String,
          
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

    
},{timestamps:true})

 const CustomerUser =  mongoose.models.CustomerUser || mongoose.model("CustomerUser", userSchema)

 export default CustomerUser;