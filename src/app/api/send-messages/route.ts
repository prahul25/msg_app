import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/Message.model";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();
  console.log({username,content},'Checking is that we are getting info')
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    
    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 403 }
      );
    }
    
    const newMessage = {content , createdAt:new Date()}
    
    // console.log(user.messages,'checking user messagws kaise le raha he')
    user.messages.push(newMessage as Message)
    
    await user.save()
    // console.log(user.messages,'Checking that message saving or not')
    return Response.json(
      {
        success: true,
        message: "Successfully message sent",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Successfully message sent", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
