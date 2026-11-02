import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";
import { toStr } from "@/helpers/auth";
import { rateLimit } from "@/helpers/rateLimit";

export async function POST(request: NextRequest){

    try {
        const limited = rateLimit(request, "verify-email", 20, 15 * 60 * 1000);
        if (limited) return limited;

        await connectToDatabase();
        const reqbody = await request.json()
        // Force a string so {"$ne": null} can't verify an arbitrary account
        const token = toStr(reqbody.token, 200);

        if (!token) {
            return NextResponse.json({error:"Invalid Token"},{status:400})
        }

      const user = await  CustomerUser.findOne({
            verifyToken:token,
            verifyTokenExpiry:{$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({error:"Invalid Token"},{status:400})
        }

        user.isVerified = true;
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({message:"Email verified successfully", success:true})

    } catch (error:any) {
     console.error("Verify email error:", error.message);
     return NextResponse.json({error: "Something went wrong. Please try again."},
        {status:500}
     )
    }
}
