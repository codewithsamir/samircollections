import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Customerorder from "@/models/customerorder.model";




connect();
export async function POST(request: NextRequest) {
  try {
   const reqbody = await request.json()
   const {id} = reqbody;

      // Validate the input
      if (!id) {
        return NextResponse.json(
          { success: false, message: "Customer ID is required" },
          { status: 400 }
        );
      }


  const useroder =await Customerorder.find({customer_id:id})

     // If no order is found, return a message
     if (!useroder) {
      return NextResponse.json(
        { success: false, message: "No order found for this customer ID" },
        { status: 404 }
      );
    }

  return NextResponse.json({
    message: "Successfully found data",
    data:useroder,
    success:true,

  })



   
   
  } catch (error:any) {
   
    return NextResponse.json(
      { success: false, message:error.message },
      { status: 500 }
    );
  }
}
