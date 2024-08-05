import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import mongoose from "mongoose";

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
  
  
  const userId = new mongoose.Types.ObjectId(user._id)
  try {
    const user = await UserModel.aggregate([
      {$match:{id:userId}},
      {$unwind:'$messages'},
      {$sort:{'messages.createdAt':-1}},
      {$group:{_id:'$_id',messages:{$push:'$messages'}}}
    ])
    // console.log(user , 'checking from userid')

    if (!user || user.length === 0) {
        return Response.json({
            success:false,
            message:'No messages found'
        },{status:401})
    }
    return Response.json({
        success:true,
        message:"User's all messages found",
        messages:user[0].messages
    },{status:200})
  } catch (error) {
    console.log("Failed to fetched all user's messages", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetched all user's messages",
      },
      { status: 500 }
    );
  }

}
