import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Customerorder from "@/models/customerorder.model";

// Establish the database connection
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const reqbody = await request.json();
    const { id, orderid } = reqbody;

    // Validate the input
    if (!id || !orderid) {
      return NextResponse.json(
        { success: false, message: " ID  is required" },
        { status: 400 }
      );
    }

    // Initialize a variable to hold the query result
    let userOrder;

    // Fetch orders based on `id` (customer ID) if provided
    if (id) {
      userOrder = await Customerorder.find({ customer_id: id });

      // If no orders are found, return an error message
      if (!userOrder || userOrder.length === 0) {
        return NextResponse.json(
          { success: false, message: "No orders found for this customer ID" },
          { status: 404 }
        );
      }
    }

    // Fetch order based on `orderid` (order ID) if provided
    else if (orderid) {
      userOrder = await Customerorder.findById(orderid);

      // If no order is found, return an error message
      if (!userOrder) {
        return NextResponse.json(
          { success: false, message: "No order found for this order ID" },
          { status: 404 }
        );
      }
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
