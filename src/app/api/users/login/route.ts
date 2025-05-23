import  {connectToDatabase}  from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import { generateAccessAndRefreshTokens } from "@/helpers/generateAccessAndRefreshTokens";



connectToDatabase()
export async function POST(request: NextRequest){
    
    try {
      const reqbody = await request.json();  
      const { email, password } = reqbody
    //   console.log(email);

    //   check if user exits 
     const user = await CustomerUser.findOne({email})
     if(!user){
        return NextResponse.json({
            error:"User does not exist"
        },{status:400})
    }


  // check if user verified or not 
  if(!user.isVerified){
    // console.log("email not verified")
    return NextResponse.json({
        error:"Email not verified. Check your inbox or spam to complete verification."
    },{status:401})
}

    // check if password is correct 
    const isPasswordsCorrect = await bcryptjs.compare(password, user.password)

   if(!isPasswordsCorrect){
        return NextResponse.json({error:"Password is incorrect"},{status:400})
    }

    // create token data 
    // const tokenData = { 
    //     id:user._id,
    //     email:user.email,
    //     username:user.username,
    //  }

    //  create Token
    // const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET! as string , {expiresIn: String(process.env.ACCESS_TOKEN_EXPIRE)})
    const { accesstoken, refreshtoken } = await generateAccessAndRefreshTokens(
        user._id
      );

    const response = NextResponse.json(
     { 
          message: "Login successful",
          isAdmin:user.isAdmin,
        success:true,
    }
    )
    if(user.role === "admin"){
        response.cookies.set("admin_token",accesstoken,{
            httpOnly:true,
    
        })
        response.cookies.set("admin_refreshToken",refreshtoken,{
            httpOnly:true,
        })
    }else{
        response.cookies.set("token",accesstoken,{
            httpOnly:true,
    
        })
        response.cookies.set("refreshToken",refreshtoken,{
            httpOnly:true,
        })
    }
   

    return response;

        
    } catch (error:any) {
      
        return NextResponse.json({error: error.message}, {status: 500});
    }
}