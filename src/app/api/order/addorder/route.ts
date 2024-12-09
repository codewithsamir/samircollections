import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Customerorder from "@/models/customerorder.model";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();  // Await to properly parse the JSON body

    // Destructure values from the request body
    const {
      customer_id,
      cloth_detail,
      pickup_date,
      delivery_date,
      discount,
      status
    } = reqbody;

    // Validate required fields
    if (!customer_id || !cloth_detail || cloth_detail.length === 0 || !pickup_date ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new Customerorder
    const newOrder = new Customerorder({
      customer_id,
      cloth_detail,
      pickup_date,
      delivery_date,
      discount,
      status,
    });

    // Save the order to the database
    await newOrder.save();

    // Return success response with the saved order data
    return NextResponse.json(
      { success: true, message: "Order created successfully", order: newOrder },
      { status: 201 }
    );
  } catch (error: any) {
    // Handle any errors that occur during the process
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
