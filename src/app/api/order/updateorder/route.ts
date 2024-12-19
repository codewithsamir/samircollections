import Customerorder from "@/models/customerorder.model"; // Import the Mongoose model for the customer order
import { NextRequest, NextResponse } from "next/server"; // Import Next.js types for request and response handling

// Define the POST function to handle order updates
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body of the request
    const reqbody = await req.json();

    // Extract the `orderid` and `updatedData` from the request body
    const { orderid, updatedData } = reqbody;

    // Check if `orderid` is provided
    if (!orderid) {
      return NextResponse.json(
        { error: "Order ID is not found" },
        { status: 401 } // Unauthorized status
      );
    }

    // Find the order by `orderid` in the database
    const order = await Customerorder.findOne({ orderid });

    // If no order is found, return an error response
    if (!order) {
      return NextResponse.json(
        { error: "No order found for this ID" },
        { status: 404 } // Not found status
      );
    }

    // Update the order details with the provided `updatedData`
    const updatedOrder = await Customerorder.findOneAndUpdate(
      { orderid }, // Find the order by `orderid`
      { $set: updatedData }, // Update fields in the order
      { new: true } // Return the updated document
    );

    // Return the updated order data in the response
    return NextResponse.json(
      { message: "Order updated successfully", data: updatedOrder },
      { status: 200 } // Success status
    );
  } catch (error: any) {
    // Handle unexpected errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 } // Internal server error status
    );
  }
}
