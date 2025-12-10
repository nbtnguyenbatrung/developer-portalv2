// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IPermission extends Document {
  id: string;
  code: string;
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IPermissionDoc extends Document {
  name: string;
  code: string;
  active: boolean;
}

const PermissionSchema = new Schema<IPermissionDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual getter chuyển _id thành id
PermissionSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret: any) {
    // giữ lại _id hoặc đổi tên sang id
    ret.id = ret._id.toString();
    delete ret._id;
  },
});
export const Permission =
  mongoose.models.Permission ||
  mongoose.model<IPermissionDoc>("Permission", PermissionSchema);
