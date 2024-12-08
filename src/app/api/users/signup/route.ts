import { connect } from "@/dbConfig/dbConfig";
import CustomerUser from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendemail } from "@/helpers/mailer";
import jwt from 'jsonwebtoken';


connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // console.log(reqBody);
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

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new CustomerUser({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    // console.log(savedUser);

    // send verification email 
   await sendemail({email, emailType: "VERIFY", userId: savedUser._id});

     // create token data 
     const tokenData = { 
      id:savedUser._id,
      email:savedUser.email,
      username:savedUser.username,
   }

  //  create Token
  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET! as string , {expiresIn: "1d"})

  const response = NextResponse.json({
    message: "User created successfully",
    sucess: true,
    data: savedUser,
  })
  response.cookies.set("token",token,{
    httpOnly:true,

})


    return response;
  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}
