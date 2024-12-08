import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Customerorder from "@/models/customerorder.model";




connect();
export async function POST(request: NextRequest) {
  try {
  const reqbody = request.json()
  const {} = reqbody;
   
   
  } catch (error:any) {
   
    return NextResponse.json(
      { success: false, message:error.message },
      { status: 500 }
    );
  }
}
