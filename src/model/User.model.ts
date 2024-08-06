import mongoose, { Document, Schema } from "mongoose";
import MessageSchema, { Message } from "./Message.model";

export interface User extends Document {
  username: string; // in TypeScript string is written like this
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry:Date
  isVerified:boolean
  isAcceptingMessages:boolean
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
  isAcceptingMessages: {
    type:Boolean, // In mongoDB Boolean is written like this
    default:true
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  messages:[MessageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);
export default UserModel