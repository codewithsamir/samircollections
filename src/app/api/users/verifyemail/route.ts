import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";


connectToDatabase()

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
        
    } catch (error:any) {
        
     return NextResponse.json({error: error.message},
        {status:500}
     )   
    }
}

