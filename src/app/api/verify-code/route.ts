import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export async function POST(request: Request) {
  dbConnect();

  try {
    const { username, code } = await request.json(); // if we take username from url we shuould best practice like to decode the url because browser replace their specail character with the username contains special character
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: "User successfully verified" },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired, Please signup again to get a new code",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        { success: false, message: "Incorrect verification code" },
        { status: 400 }
      );
    }
  } catch (error) {
    // console.log("Error while verifying code");
    return Response.json(
      { success: false, message: "Error while verifying user" },
      { status: 200 }
    );
  }
}
