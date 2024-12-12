import { connect } from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendemail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";
import { generateAccessAndRefreshTokens } from "@/helpers/generateAccessAndRefreshTokens";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, isAdmin, role } = reqBody;
    console.log(reqBody);
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    //check if user already exits

    const user = await CustomerUser.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exits" },
        { status: 400 }
      );
    }

   
    
    if (isAdmin) {
      // Ensure `isAdmin` field exists and is set correctly in the database
      const existingAdmin = await CustomerUser.findOne({ isAdmin: true });
    
      console.log("Existing admin:", existingAdmin);
    
      if (existingAdmin) {
        // Return an error response if an admin already exists
        return NextResponse.json(
          { error: "An admin user already exists. Only one admin is allowed." },
          { status: 400 }
        );
      }
    }
    

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

  

    const newUser = new CustomerUser({
      username,
      email,
      password: hashedPassword,
      role,
      isAdmin
    });

    const savedUser = await newUser.save();
    // console.log(savedUser);

    // send verification email
    await sendemail({ email, emailType: "VERIFY", userId: savedUser._id });

    // create token data
    // const tokenData = {
    //   id: savedUser._id,
    //   email: savedUser.email,
    //   username: savedUser.username,
    // };

    //  create Token
    // const token = await jwt.sign(
    //   tokenData,
    //   process.env.TOKEN_SECRET! as string,
    //   { expiresIn: "1d" }
    // );

    const { accesstoken, refreshtoken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const response = NextResponse.json({
      message: "User created successfully",
      sucess: true,
      data: savedUser,
    });
    if(role === "admin"){
      response.cookies.set("admin_token", accesstoken, {
        httpOnly: true,
      });
      response.cookies.set("admin_refresh_Token", refreshtoken, {
        httpOnly: true,
      });
    }
    else{

      response.cookies.set("token", accesstoken, {
        httpOnly: true,
      });
      response.cookies.set("refresh_token", refreshtoken, {
        httpOnly: true,
      });
    }

    return response;
  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}
