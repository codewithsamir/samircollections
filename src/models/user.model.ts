import mongoose, {  Schema } from "mongoose";
import jwt from 'jsonwebtoken';

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
    refreshToken:{
        type:String
    }

    
},{timestamps:true})

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this.id,
        email:this.email,
        username:this.username,
      
    },
String(process.env.ACCESS_TOKEN_SECRET),
{
    expiresIn:String(process.env.ACCESS_TOKEN_EXPIRE)
}
)
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this.id,
     
    },
String(process.env.REFRESH_TOKEN_SECRET),
{
    expiresIn:String(process.env.REFRESH_TOKEN_EXPIRE)
}
)
}

 const CustomerUser =  mongoose.models.CustomerUser || mongoose.model("CustomerUser", userSchema)

 export default CustomerUser;