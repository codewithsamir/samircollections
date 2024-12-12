import CustomerUser from "@/models/user.model";

export const generateAccessAndRefreshTokens = async (userId:any) => {
    // console.log(userId);
  
    try {
      const user = await CustomerUser.findById(userId);
  
      const accesstoken = user.generateAccessToken();
      const refreshtoken = user.generateRefreshToken();
  
      user.refreshToken = refreshtoken;
      await user.save({ validateBeforeSave: false });
  
      return { accesstoken, refreshtoken };
    } catch (error) {
      // console.log(error);
  
      throw new Error("Something went wrong while generating refresh and access token"
      );
    }
  };