import mongoose, { Document, Schema, model, Model } from "mongoose";

export interface IRole extends Document {
  code: string;
  name: string;
  permissions: string[];
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const RoleSchema: Schema<IRole> = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    permissions: [
      {
        type: String,
        ref: "Permission",
      },
    ],
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

RoleSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret: any) {
    // giữ lại _id hoặc đổi tên sang id
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export const Role =
  mongoose.models.Role || mongoose.model<IRole>("Role", RoleSchema);
