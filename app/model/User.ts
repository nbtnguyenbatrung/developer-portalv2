// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";
export interface IUser extends IUserDoc {
  id: string;
}

export interface IUserDoc extends Document {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  status?: string;
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  role: string[];
}

const UserSchema = new Schema<IUserDoc>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    role: [
      {
        type: String,
        ref: "Role",
      },
    ],
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret: any) {
    // giữ lại _id hoặc đổi tên sang id
    ret.id = ret._id.toString();
    delete ret.password;
    delete ret._id;
  },
});

export const User =
  mongoose.models.User || mongoose.model<IUserDoc>("User", UserSchema);
