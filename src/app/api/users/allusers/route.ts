import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";

import { requireAdmin } from "@/helpers/auth";
export async function GET(request: NextRequest) {
  try {
  
    await connectToDatabase();
  
    const auth = await requireAdmin(request);
    if (auth instanceof NextResponse) return auth;

    const allUser = await CustomerUser.find({ role: 'user' }).select("-password -refreshToken -forgotPasswordToken -verifyToken");


    // Return users as JSON
    return NextResponse.json(
      { success: true, data: allUser },
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
