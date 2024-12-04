import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
interface DecodedToken {
    id: string; 
  }
  
export const getDataFromToken = (request: NextRequest) => {

    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        console.log(decodedToken)
        return decodedToken.id;
        
    } catch (error) {
        const typedError = error as Error;
        throw new Error(typedError.message);
    }
}
