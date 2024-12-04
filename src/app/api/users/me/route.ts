import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import CustomerUser from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {

    try {
        const userId = await getDataFromToken(request)
        console.log(userId)
        const user = await CustomerUser.findOne({_id: userId}).select("-password ")
        console.log(user)
        return NextResponse.json({
            message:"user found successfully",
            data: user,
            success: true,
        })

    } catch (error) {
        const typedError = error as Error;
        return NextResponse.json(
            {error:typedError.message},
            {status:400}
        )
    }
}

