import { connectToDatabase } from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendemail } from "@/helpers/mailer";
import { generateAccessAndRefreshTokens } from "@/helpers/generateAccessAndRefreshTokens";
import { authCookieOptions, isValidEmail, toStr } from "@/helpers/auth";
import { rateLimit } from "@/helpers/rateLimit";

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, "signup", 5, 15 * 60 * 1000);
    if (limited) return limited;

    await connectToDatabase();
    const reqBody = await request.json();
    const username = toStr(reqBody.username, 60);
    const email = toStr(reqBody.email, 120).toLowerCase();
    const password = typeof reqBody.password === "string" ? reqBody.password : "";
    const wantsAdmin = reqBody.isAdmin === true || reqBody.role === "admin";

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }
    if (password.length < 8 || password.length > 128) {
      return NextResponse.json({ error: "Password must be 8 to 128 characters long" }, { status: 400 });
    }

    //check if user already exits

    const user = await CustomerUser.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exits" },
        { status: 400 }
      );
    }

    // Only the very first admin can be created through signup; after that nobody can self-register as admin
    if (wantsAdmin) {
      const existingAdmin = await CustomerUser.findOne({ $or: [{ isAdmin: true }, { role: "admin" }] });
      if (existingAdmin) {
        return NextResponse.json(
          { error: "An admin user already exists. Only one admin is allowed." },
          { status: 403 }
        );
      }
    }

    // hash password
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new CustomerUser({
      username,
      email,
      password: hashedPassword,
      role: wantsAdmin ? "admin" : "user",
      isAdmin: wantsAdmin,
    });

    const savedUser = await newUser.save();

    // send verification email
    await sendemail({ email, emailType: "VERIFY", userId: savedUser._id });

    const { accesstoken, refreshtoken } = await generateAccessAndRefreshTokens(
      savedUser._id
    );

    // Never send the password hash or tokens back to the browser
    const response = NextResponse.json({
      message: "User created successfully",
      sucess: true,
      data: { _id: savedUser._id, username: savedUser.username, email: savedUser.email, role: savedUser.role },
    });
    if (wantsAdmin) {
      response.cookies.set("admin_token", accesstoken, authCookieOptions);
      response.cookies.set("admin_refreshToken", refreshtoken, authCookieOptions);
    } else {
      response.cookies.set("token", accesstoken, authCookieOptions);
      response.cookies.set("refreshToken", refreshtoken, authCookieOptions);
    }

    return response;
  } catch (error) {
    console.error("Signup error:", (error as Error).message);
    return NextResponse.json({ error: "Could not create account. Please try again." }, { status: 500 });
  }
}
