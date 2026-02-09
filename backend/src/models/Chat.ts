import mongoose, { Schema, type Document } from "mongoose";

export interface IChat extends Document {
  participants: mongoose.Types.ObjectId[]; // in one chat we will have one-on-one conversation ["John", "Sanzz"] -> [123, 456]
  lastMessage?: mongoose.Types.ObjectId;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const Chat = mongoose.model("Chat", ChatSchema);
