import { connect } from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"



connect()
export async function POST(request: NextRequest){
    
    try {
      const reqbody = await request.json();  
      const { email, password } = reqbody
      console.log(reqbody);

    //   check if user exits 
     const user = await CustomerUser.findOne({email})
     if(!user){
        return NextResponse.json({
            error:"User does not exist"
        },{status:400})
    }

    // check if password is correct 
    const isPasswordsCorrect = await bcryptjs.compare(password, user.password)

    if(!isPasswordsCorrect){
        return NextResponse.json({error:"Password is incorrect"},{status:400})
    }

    // create token data 
    const tokenData = { 
        id:user._id,
        email:user.email,
        username:user.username,
     }

    //  create Token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET! as string , {expiresIn: "1d"})

    const response = NextResponse.json(
     { 
          message: "Login successful",
        success:true,
    }
    )
    response.cookies.set("token",token,{
        httpOnly:true,

    })

    return response;

        
    } catch (error) {
        const typedError = error as Error;
        return NextResponse.json({error: typedError.message}, {status: 500});
    }
}