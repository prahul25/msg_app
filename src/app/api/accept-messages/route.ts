import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User is not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();
// console.log(acceptMessages, 'Checking what we are recieving')
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    return Response.json(
        {
          success: true,
          message: "Successfully update user status to accept messages",
          updatedUser
        },
        { status: 200 }
      );
  } catch (error) {
    console.log("Failed to update user status to accept messages", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user status to accept messages",
      },
      { status: 500 }
    );
  }
}
export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User is not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  

  try {
    const foundUser = await UserModel.findById(
       userId
    );
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    return Response.json(
        {
          success: true,
          message: "Successfully fetched user status to accept messages",
          isAcceptingMessages : foundUser.isAcceptingMessages
        },
        { status: 200 }
      );
  } catch (error) {
    // console.log("Failed to fetched user status to accept messages", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetched user status to accept messages",
      },
      { status: 500 }
    );
  }
}
