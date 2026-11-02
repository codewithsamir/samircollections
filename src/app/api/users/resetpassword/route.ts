import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";
import bcrypt from "bcryptjs"; // Use bcrypt for password hashing
import { toStr } from "@/helpers/auth";
import { rateLimit } from "@/helpers/rateLimit";

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, "reset-password", 10, 15 * 60 * 1000);
    if (limited) return limited;

    await connectToDatabase();
    const reqBody = await request.json();
    // Force strings so a payload like {"token": {"$ne": null}} can't match someone else's reset token
    const token = toStr(reqBody.token, 200);
    const password = typeof reqBody.password === "string" ? reqBody.password : "";

    if (!token) {
      return NextResponse.json({ error: "Invalid or expired token." }, { status: 400 });
    }
    if (password.length < 8 || password.length > 128) {
      return NextResponse.json({ error: "Password must be 8 to 128 characters long." }, { status: 400 });
    }

    // Find the user by the reset token and ensure the token hasn't expired
    const user = await CustomerUser.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 400 }
      );
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password and clear the reset token; also log out other sessions
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    user.refreshToken = undefined;
    await user.save();

    return NextResponse.json(
      {
        message: "Password has been successfully reset.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error:any) {
    console.error("Reset password error:", error.message);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again.", },
      { status: 500 }
    );
  }
}
