import { connectToDatabase } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import CustomerUser from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    // Retrieve user ID from the token
    const userId = await getDataFromToken(request);
        // console.log(userId)
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: ID not found." },
        { status: 401 }
      );
    }

    // Fetch the user, excluding sensitive fields
    const user = await CustomerUser.findOne({ _id: userId }).select(
      "-password -refreshToken"
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // Successful response with user data
    return NextResponse.json({
      message: "User found successfully.",
      data: user,
      success: true,
    });
  } catch (error: any) {
    // console.error("Error in GET handler:", error.message);

    // Return error response with appropriate status
    return NextResponse.json(
      { error: "Internal Server Error: " + error.message },
      { status: 500 }
    );
  }
}
