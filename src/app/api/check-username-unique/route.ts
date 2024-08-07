import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import UserModel from "@/model/User.model";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  // checking upcoming username through zod
  username: usernameValidation,
});

export async function GET(request: Request) {

  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = { username: searchParams.get("username") };

    // validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username
      // isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error,"Error while checking username");
    return Response.json(
      { success: false, message: "Error while checking username" },
      { status: 500 }
    );
  }
}
