import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import Customerorder from "@/models/customerorder.model";
import { getAuthUser, isAdminUser, toStr } from "@/helpers/auth";

// Establish the database connection

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Please log in to continue." }, { status: 401 });
    }
    // Parse the request body
    const reqbody = await request.json();
    const id = toStr(reqbody.id, 100);

    // Validate the input
    if (!id ) {
      return NextResponse.json(
        { success: false, message: " ID  is required"},
        { status: 400 }
      );
    }

    // Customers can only see their own orders
    if (!isAdminUser(authUser) && String(authUser._id) !== id) {
      return NextResponse.json({ success: false, message: "You are not allowed to view these orders." }, { status: 403 });
    }

    // Initialize a variable to hold the query result
    const userOrder = await Customerorder.find({ customer_id: id });

    // Fetch orders based on `id` (customer ID) if provided
 

      // If no orders are found, return an error message
      if (!userOrder || userOrder.length === 0) {
        return NextResponse.json(
          { success: false, message: "No orders found for this customer ID" },
          { status: 404 }
        );
      }
    

 
    // Return the found order(s) in the response
    return NextResponse.json(
      {
        success: true,
        message: "Successfully found data",
        data: userOrder,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle unexpected errors
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
