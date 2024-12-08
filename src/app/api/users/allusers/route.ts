import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";

import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();
export async function GET(request: NextRequest) {
  try {
  
    const userId = await getDataFromToken(request)
    // Fetch all users
    const users = await CustomerUser.findOne({_id: userId}).select("-password "); 

    if(!users.isAdmin){
        return NextResponse.json({error:"Admin not found or unauthorized access"},{status:403})
    }

    const alluser = await CustomerUser.find({}).select("-password")

    // Return users as JSON
    return NextResponse.json(
      { success: true, data: alluser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);

    // Return error response
    return NextResponse.json(
      { success: false, message: "Failed to fetch users." },
      { status: 500 }
    );
  }
}
