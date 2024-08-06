import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function DELETE(request: Request , {params}:{params:{messageid:string}}) {
  await dbConnect();
  const messageId = params.messageid
  const session = await getServerSession(authOptions)
  const user:User = session?.user as User

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User is not Authenticated to perfom logout action",
      },
      { status: 401 }
    );
  }
  
  try {
    const updatedUser = await UserModel.updateOne({_id:user._id},{$pull:{messages:{_id:messageId}}})
    if(updatedUser.modifiedCount == 0){
      
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Successfully message deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.log("Error while deleting message", error);
    return Response.json(
      {
        success: false,
        message: "Error while deleting message",
      },
      { status: 500 }
    );
  }
}

