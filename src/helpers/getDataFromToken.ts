import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string; 
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const admin_token = request.cookies.get("admin_token")?.value || "";
    const secret = process.env.TOKEN_SECRET!;

    let decodedToken: DecodedToken | null = null;
    if (token) {
      decodedToken = jwt.verify(token, secret) as DecodedToken;
    }

    let adminDecodedToken: DecodedToken | null = null;
    if (admin_token) {
      adminDecodedToken = jwt.verify(admin_token, secret) as DecodedToken;
    }

    // Return the id based on which token is successfully decoded
    if (decodedToken) {
      return decodedToken.id;
    } else if (adminDecodedToken) {
      return adminDecodedToken.id;
    } else {
      throw new Error("No valid token found.");
    }

  } catch (error) {
    const typedError = error as Error;
    throw new Error(typedError.message);
  }
}
