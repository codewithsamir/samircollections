import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";
import { sendemail } from "@/helpers/mailer";

connect()


export async function POST(request : NextRequest){
  try {
      const reqbody = await request.json()
      const {email} = reqbody;
  
     const user = await CustomerUser.findOne({email})
  
      if(!user){
          return NextResponse.json({error:"No user found with the provided email address."},{status:404})
      }
  
      await sendemail({email, emailType: "RESET", userId: user._id});

      return NextResponse.json({
        message:"A password reset link has been successfully sent to your email.",
        success:true
      },{ status: 200 })
  } catch (error) {
    const typedError = error as Error;
     return NextResponse.json({error: typedError.message},
        {status:500}
     )   
  }
}