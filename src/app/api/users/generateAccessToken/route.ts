import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import CustomerUser from "@/models/user.model";
import { generateAccessAndRefreshTokens } from "@/helpers/generateAccessAndRefreshTokens";



export async function POST(req : NextRequest){
 
try {
        const incomingRefreshToken = req.cookies.get("token")?.value || req.cookies.get("admin_token")?.value || "";
   
    
        if(!incomingRefreshToken){
            return NextResponse.json({error:"unauthorized reqest"},{status:401})
        }

        const decodedToken:any = jwt.verify( incomingRefreshToken, String(process.env.REFRESH_TOKEN_SECRET))

        const user  = await CustomerUser.findById(decodedToken?._id);

        if(!user){
            return NextResponse.json({error:"Invalid refresh Token"},{status:401})
        }

        if(incomingRefreshToken !== user?.refreshToken){
            return NextResponse.json({error:"Refresh Token is expired "})
        }

        const options = {
            httpOnly: true,
            secure: true,
          };


  const { accesstoken, refreshtoken } = await generateAccessAndRefreshTokens(
      user._id
    );
    
    const response = NextResponse.json(
        { 
             message: "successfully accesstoken generated",
             success:true,
       }
       )

       response.cookies.set("token", accesstoken)
       response.cookies.set("refreshToken", refreshtoken)



} catch (error:any) {
    return NextResponse.json(
        {error: error.message}, {status: 500}
    )
}


}