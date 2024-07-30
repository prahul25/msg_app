import mongoose, { Document, Mongoose, Schema } from "mongoose";
import { Message } from "./Message.model";

export interface User extends Document {
  username: string; // in TypeScript string is written like this
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry:Date
  isVerified:boolean
  isAcceptingMsg:boolean
  messages:Message[] 
  // createdAt: Date;
}

const UserSchema: Schema<User> = new mongoose.Schema({
  email: {
    type: String, // but in  mongoDB String is declare like this
    required: [true,'Email is required'],
    unique:true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Please provide a valid email address"]
  },
  username: {
    type: String,
    required: [true,'Username is required'],
    unique:true,
    trim:true
  },
  password: {
    type: String,
    required: [true,'Password is required'],
  },
  verifyCode: {
    type: String,
    required:[true,"Verify code is required"]
},
verifyCodeExpiry: {
    type: Date,
    required:[true,"Verify code is required"]
  },
  isAcceptingMsg: {
    type:Boolean, // In mongoDB Boolean is written like this
    default:true
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  messages:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Message'
  }]
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  //   required: true,
  // },
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);
export default UserModel