import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import CustomerUser from "@/models/user.model";
import { generateAccessAndRefreshTokens } from "@/helpers/generateAccessAndRefreshTokens";
import { authCookieOptions, isAdminUser } from "@/helpers/auth";

export async function POST(req : NextRequest){

try {
        await connectToDatabase();
        const incomingRefreshToken = req.cookies.get("admin_refreshToken")?.value || req.cookies.get("refreshToken")?.value || "";

        if(!incomingRefreshToken){
            return NextResponse.json({error:"unauthorized reqest"},{status:401})
        }

        let decodedToken: { _id?: string } | null = null;
        try {
            decodedToken = jwt.verify(incomingRefreshToken, String(process.env.REFRESH_TOKEN_SECRET)) as { _id?: string };
        } catch {
            return NextResponse.json({error:"Invalid refresh Token"},{status:401})
        }

        const user  = await CustomerUser.findById(decodedToken?._id);

        // The token must be the latest one issued to this user (old/stolen tokens are rejected)
        if(!user || incomingRefreshToken !== user.refreshToken){
            return NextResponse.json({error:"Invalid refresh Token"},{status:401})
        }

  const { accesstoken, refreshtoken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const response = NextResponse.json(
        {
             message: "successfully accesstoken generated",
             success:true,
       }
       )

       const admin = isAdminUser(user);
       response.cookies.set(admin ? "admin_token" : "token", accesstoken, authCookieOptions)
       response.cookies.set(admin ? "admin_refreshToken" : "refreshToken", refreshtoken, authCookieOptions)
       return response;

} catch (error:any) {
    console.error("Refresh token error:", error.message);
    return NextResponse.json(
        {error: "Something went wrong"}, {status: 500}
    )
}
}
