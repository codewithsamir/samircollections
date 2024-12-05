import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";


connect()

export async function POST(request: NextRequest){

    try {
        const reqbody = await request.json()
        const {token} = reqbody;
        // console.log("this is token",token)
      const user = await  CustomerUser.findOne({
            verifyToken:token,
            verifyTokenExpiry:{$gt: Date.now()}
        })
        
        if(!user){
            return NextResponse.json({error:"Invalid Token"},{status:400})
        }
        // console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()
        
        return NextResponse.json({message:"Email verified successfully", success:true})
        
    } catch (error) {
        const typedError = error as Error;
     return NextResponse.json({error: typedError.message},
        {status:500}
     )   
    }
}

