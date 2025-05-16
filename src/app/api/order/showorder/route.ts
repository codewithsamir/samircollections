import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import Customerorder from "@/models/customerorder.model";

// Establish the database connection
connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const reqbody = await request.json();
    const { id} = reqbody;

    // Validate the input
    if (!id ) {
      return NextResponse.json(
        { success: false, message: " ID  is required"},
        { status: 400 }
      );
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
