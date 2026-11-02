import { NextResponse } from "next/server";
import { authCookieOptions } from "@/helpers/auth";

const AUTH_COOKIES = ["token", "refreshToken", "refresh_Token", "admin_token", "admin_refreshToken", "admin_refresh_Token"];

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success:true,
        })

        for (const name of AUTH_COOKIES) {
            response.cookies.set(name, "", { ...authCookieOptions, expires: new Date(0) })
        }

        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500});
    }
}
