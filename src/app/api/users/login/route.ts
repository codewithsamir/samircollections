import  {connectToDatabase}  from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { generateAccessAndRefreshTokens } from "@/helpers/generateAccessAndRefreshTokens";
import { authCookieOptions, isAdminUser, toStr } from "@/helpers/auth";
import { rateLimit } from "@/helpers/rateLimit";

export async function POST(request: NextRequest){
    try {
      // 10 login attempts per 15 minutes per IP to stop password guessing
      const limited = rateLimit(request, "login", 10, 15 * 60 * 1000);
      if (limited) return limited;

      await connectToDatabase();
      const reqbody = await request.json();
      const email = toStr(reqbody.email, 120);
      const password = typeof reqbody.password === "string" ? reqbody.password : "";

      if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
      }

     const user = await CustomerUser.findOne({ email: { $in: [email, email.toLowerCase()] } })

    // Same message for unknown email and wrong password so attackers can't discover registered emails
    const isPasswordsCorrect = user ? await bcryptjs.compare(password, user.password) : false
    if(!user || !isPasswordsCorrect){
        return NextResponse.json({error:"Invalid email or password"},{status:400})
    }

  if(!user.isVerified){
    return NextResponse.json({
        error:"Email not verified. Check your inbox or spam to complete verification."
    },{status:401})
}

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

    if(isAdminUser(user)){
        response.cookies.set("admin_token",accesstoken,authCookieOptions)
        response.cookies.set("admin_refreshToken",refreshtoken,authCookieOptions)
    }else{
        response.cookies.set("token",accesstoken,authCookieOptions)
        response.cookies.set("refreshToken",refreshtoken,authCookieOptions)
    }

    return response;

    } catch (error:any) {
        console.error("Login error:", error.message);
        return NextResponse.json({error: "Something went wrong. Please try again."}, {status: 500});
    }
}
