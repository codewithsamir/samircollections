import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  _id: string; 
}

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const admin_token = request.cookies.get("admin_token")?.value || "";
    const secret = process.env.ACCESS_TOKEN_SECRET;
  

    if (!secret) {
      throw new Error("TOKEN_SECRET is not defined in the environment variables.");
    }

    let decodedToken: DecodedToken | null = null;

    if (token) {
      decodedToken = jwt.verify(token, secret) as DecodedToken;
      // console.log("Decoded user token:", decodedToken);
      return decodedToken._id;
    }

    if (admin_token) {
      const adminDecodedToken = jwt.verify(admin_token, secret) as DecodedToken;
      // console.log("Decoded admin token:", adminDecodedToken);
      return adminDecodedToken._id;
    }

    throw new Error("No valid token found.");

  } catch (error: any) {

    // console.error("Error in getDataFromToken:", error.message);1
    throw new Error(error.message);
  }
};
