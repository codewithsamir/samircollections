import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";
import { sendemail } from "@/helpers/mailer";
import { toStr } from "@/helpers/auth";
import { rateLimit } from "@/helpers/rateLimit";

export async function POST(request : NextRequest){
  try {
      // Limit reset emails to stop inbox spamming
      const limited = rateLimit(request, "forgot-password", 5, 15 * 60 * 1000);
      if (limited) return limited;

      await connectToDatabase();
      const reqbody = await request.json()
      const email = toStr(reqbody.email, 120);

      if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }

     const user = await CustomerUser.findOne({ email: { $in: [email, email.toLowerCase()] } })

      // Same response whether or not the email exists, so registered emails can't be discovered
      if(user){
        await sendemail({email: user.email, emailType: "RESET", userId: user._id});
      }

      return NextResponse.json({
        message:"If an account exists for this email, a password reset link has been sent.",
        success:true
      },{ status: 200 })

  } catch (error) {
    console.error("Forgot password error:", (error as Error).message);
     return NextResponse.json({error: "Something went wrong. Please try again."},
        {status:500}
     )
  }
}
