import mongoose,{Document, Schema} from "mongoose";

export interface Message extends Document{
    content:string; // in TypeScript string is written like this
    createdAt:Date
}

const MessageSchema:Schema<Message> = new mongoose.Schema({
    content:{
        type:String, // but in  mongoDB String is declare like this
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
})

const MessageModel = mongoose.model('Message',MessageSchema)
export default MessageModel