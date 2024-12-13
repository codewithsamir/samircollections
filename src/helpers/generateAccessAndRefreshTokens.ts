import CustomerUser from "@/models/user.model";
import mongoose from "mongoose";

export const generateAccessAndRefreshTokens = async (userId: string) => {
  try {
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const user = await CustomerUser.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Generate tokens
    const accesstoken = user.generateAccessToken();
    const refreshtoken = user.generateRefreshToken();

    // Update and save user document
    user.refreshToken = refreshtoken;
    await user.save({ validateBeforeSave: false });

    return { accesstoken, refreshtoken };
  } catch (error: any) {
    console.error("Error in generateAccessAndRefreshTokens:", error.message);
    throw new Error(
      "Something went wrong while generating refresh and access token"
    );
  }
};
