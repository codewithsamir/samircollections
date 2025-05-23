import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success:true,
        })

        response.cookies.set("token","",{
            httpOnly: true,
            expires: new Date(0),
        })
        response.cookies.set("refresh_Token","",{
            httpOnly: true,
            expires: new Date(0),
        })
        response.cookies.set("admin_token","",{
            httpOnly: true,
            expires: new Date(0),
        })
        response.cookies.set("admin_refreshToken","",{
            httpOnly: true,
            expires: new Date(0),
        })

        return response;
        
    } catch (error:any) {
        
        return NextResponse.json({error: error.message},{status: 500});
    }
}