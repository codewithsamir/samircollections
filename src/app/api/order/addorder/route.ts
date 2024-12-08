import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Customerorder from "@/models/customerorder.model";




connect();
export async function GET(request: NextRequest) {
  try {
  
   
   
  } catch (error:any) {
   
    return NextResponse.json(
      { success: false, message:error.message },
      { status: 500 }
    );
  }
}
